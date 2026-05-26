import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { renderFilename } from "@/lib/filename-patterns";
import { processImage } from "@/lib/image-processing";
import { getMarketplaceProfile } from "@/lib/marketplace-profiles";
import { normalizePlan, planLimits } from "@/lib/plans";
import { prisma } from "@/lib/prisma";
import { getMonthlyImageUsage } from "@/lib/usage";
import { createZip, type ZipFile } from "@/lib/zip";

export const runtime = "nodejs";

const settingsSchema = z.object({
  packName: z.string().min(1).max(120).default("Listing image pack"),
  profileId: z.enum(["ETSY_DIGITAL", "ETSY_PHYSICAL", "AMAZON"]),
  sku: z.string().min(1).max(80),
  filenamePattern: z.string().min(1).max(180),
  resizeMode: z.enum(["FIT", "SQUARE_CROP", "KEEP_ASPECT"]),
  maxWidth: z.coerce.number().int().min(400).max(6000),
  maxHeight: z.coerce.number().int().min(400).max(6000),
  quality: z.coerce.number().int().min(60).max(95),
  outputFormat: z.enum(["jpeg", "webp"]),
  watermark: z.object({
    enabled: z.boolean(),
    text: z.string().max(120),
    mode: z.enum(["DIAGONAL_REPEAT", "CENTER", "BOTTOM_RIGHT"]),
    opacity: z.coerce.number().min(0).max(1),
    fontSize: z.coerce.number().int().min(12).max(160),
    rotation: z.coerce.number().min(-90).max(90),
    color: z.string().max(20),
  }),
});

const slotSchema = z.array(
  z.object({
    fileIndex: z.number().int().nonnegative(),
    slotId: z.string(),
    slotName: z.string(),
    originalName: z.string(),
  }),
);

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to export image packs." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files").filter((value): value is File => value instanceof File);
    const settings = settingsSchema.parse(JSON.parse(String(formData.get("settingsJson") || "{}")));
    const slots = slotSchema.parse(JSON.parse(String(formData.get("slotAssignmentsJson") || "[]")));
    const profile = getMarketplaceProfile(settings.profileId);
    const plan = normalizePlan(user.plan);
    const limits = planLimits[plan];

    if (settings.profileId === "AMAZON" && !limits.amazonProfiles) {
      return NextResponse.json({ error: "Amazon profiles are available on Pro." }, { status: 403 });
    }
    if (!files.length) return NextResponse.json({ error: "Upload at least one JPG, PNG, or WebP image." }, { status: 400 });
    if (files.length > limits.maxImagesPerPack) {
      return NextResponse.json({ error: `${plan} allows ${limits.maxImagesPerPack} images per pack.` }, { status: 403 });
    }

    const used = await getMonthlyImageUsage(user.id);
    if (used + files.length > limits.monthlyImages) {
      return NextResponse.json({ error: `Monthly image limit reached. ${plan} allows ${limits.monthlyImages} images/month.` }, { status: 403 });
    }

    const zipFiles: ZipFile[] = [];
    const manifestRows = [["Original filename", "Output filename", "Slot name", "Dimensions", "File size", "Watermark applied"]];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        return NextResponse.json({ error: `${file.name} is not a supported image type.` }, { status: 400 });
      }
      if (file.size > 20 * 1024 * 1024) {
        return NextResponse.json({ error: `${file.name} is larger than the 20 MB per-file limit.` }, { status: 400 });
      }

      const slot = slots.find((item) => item.fileIndex === index) ?? {
        slotName: profile.slots[index]?.label ?? `Image ${index + 1}`,
        slotId: profile.slots[index]?.id ?? `image-${index + 1}`,
        originalName: file.name,
      };
      const output = await processImage(Buffer.from(await file.arrayBuffer()), {
        resizeMode: settings.resizeMode,
        maxWidth: settings.maxWidth,
        maxHeight: settings.maxHeight,
        quality: settings.quality,
        outputFormat: settings.outputFormat,
        watermark: settings.watermark,
      });
      const extension = settings.outputFormat === "webp" ? "webp" : "jpg";
      const outputName = renderFilename({
        pattern: settings.filenamePattern,
        sku: settings.sku,
        asin: settings.sku,
        slotNumber: index + 1,
        slotName: slot.slotName,
        original: file.name,
        profile: profile.id,
        extension,
      });

      zipFiles.push({ name: outputName, buffer: output.buffer });
      manifestRows.push([
        file.name,
        outputName,
        slot.slotName,
        `${output.width}x${output.height}`,
        String(output.size),
        String(settings.watermark.enabled),
      ]);
    }

    const manifestCsv = manifestRows.map((row) => row.map(csvEscape).join(",")).join("\n");
    zipFiles.push({ name: "manifest.csv", buffer: Buffer.from(manifestCsv) });
    const zip = await createZip(zipFiles);

    const pack = await prisma.imagePack.create({
      data: {
        userId: user.id,
        name: settings.packName,
        sku: settings.sku,
        marketplaceProfile: profile.id,
        settingsJson: JSON.stringify(settings),
        manifestJson: JSON.stringify(manifestRows.slice(1)),
        status: "EXPORTED",
      },
    });
    await prisma.usageEvent.create({
      data: { userId: user.id, eventType: "export_completed", imageCount: files.length, packId: pack.id },
    });

    return new NextResponse(new Uint8Array(zip), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${settings.sku || "listing"}-image-pack.zip"`,
      },
    });
  } catch (error) {
    console.error("[export]", error);
    return NextResponse.json({ error: "Could not generate the ZIP. Check your files and settings, then try again." }, { status: 400 });
  }
}

function csvEscape(value: string) {
  return `"${value.replaceAll("\"", "\"\"")}"`;
}
