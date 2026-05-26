"use client";

import Image from "next/image";
import { Download, GripVertical, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Label, Select } from "@/components/ui/form";
import { ImageDropzone } from "@/components/pack/image-dropzone";
import { renderFilename } from "@/lib/filename-patterns";
import { marketplaceProfiles } from "@/lib/marketplace-profiles";
import { normalizePlan, planLimits } from "@/lib/plans";
import { formatBytes } from "@/lib/utils";
import type { UploadedImage } from "@/lib/client-image-utils";

export function PackWizard({ plan }: { plan: string }) {
  const normalizedPlan = normalizePlan(plan);
  const limits = planLimits[normalizedPlan];
  const [profileId, setProfileId] = useState("ETSY_DIGITAL");
  const profile = marketplaceProfiles.find((item) => item.id === profileId) ?? marketplaceProfiles[0];
  const [packName, setPackName] = useState("Spring pattern listing pack");
  const [sku, setSku] = useState("SPRING-001");
  const [filenamePattern, setFilenamePattern] = useState(profile.defaultFilenamePattern);
  const [resizeMode, setResizeMode] = useState("FIT");
  const [maxWidth, setMaxWidth] = useState(profile.defaultMaxWidth);
  const [maxHeight, setMaxHeight] = useState(profile.defaultMaxHeight);
  const [quality, setQuality] = useState(profile.defaultQuality);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "webp">(profile.outputFormat);
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [watermarkText, setWatermarkText] = useState("Sample - do not copy");
  const [watermarkMode, setWatermarkMode] = useState("DIAGONAL_REPEAT");
  const [opacity, setOpacity] = useState(0.18);
  const [fontSize, setFontSize] = useState(42);
  const [rotation, setRotation] = useState(-28);
  const [color, setColor] = useState("#111111");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [status, setStatus] = useState("");

  const filenamePreview = useMemo(
    () =>
      images.map((image, index) => {
        const slot = profile.slots.find((item) => item.id === image.assignedSlotId) ?? profile.slots[index] ?? { label: image.customSlotLabel || `Image ${index + 1}` };
        return {
          id: image.id,
          original: image.originalName,
          slot: image.customSlotLabel || slot.label,
          output: renderFilename({
            pattern: filenamePattern,
            sku,
            asin: sku,
            slotNumber: index + 1,
            slotName: image.customSlotLabel || slot.label,
            original: image.originalName,
            profile: profile.id,
            extension: outputFormat === "webp" ? "webp" : "jpg",
          }),
        };
      }),
    [filenamePattern, images, outputFormat, profile, sku],
  );

  function updateImage(id: string, patch: Partial<UploadedImage>) {
    setImages(images.map((image) => (image.id === id ? { ...image, ...patch } : image)));
  }

  async function exportZip() {
    if (!images.length) {
      setStatus("Upload at least one image before exporting.");
      return;
    }
    setStatus("Processing ZIP...");
    const form = new FormData();
    images.forEach((image) => form.append("files", image.file));
    form.append(
      "settingsJson",
      JSON.stringify({
        packName,
        profileId,
        sku,
        filenamePattern,
        resizeMode,
        maxWidth,
        maxHeight,
        quality,
        outputFormat,
        watermark: { enabled: watermarkEnabled, text: watermarkText, mode: watermarkMode, opacity, fontSize, rotation, color },
      }),
    );
    form.append(
      "slotAssignmentsJson",
      JSON.stringify(
        images.map((image, fileIndex) => ({
          fileIndex,
          slotId: image.assignedSlotId || profile.slots[fileIndex]?.id || `custom-${fileIndex}`,
          slotName: image.customSlotLabel || profile.slots.find((slot) => slot.id === image.assignedSlotId)?.label || profile.slots[fileIndex]?.label || `Image ${fileIndex + 1}`,
          originalName: image.originalName,
        })),
      ),
    );

    const response = await fetch("/api/packs/export", { method: "POST", body: form });
    if (!response.ok || response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json().catch(() => ({}));
      setStatus(data.error || "Export failed.");
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sku || "listing"}-image-pack.zip`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Export complete. The ZIP contains processed images and manifest.csv.");
  }

  async function savePreset() {
    const response = await fetch("/api/presets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${profile.label} preset`,
        marketplaceProfile: profileId,
        filenamePattern,
        resizeMode,
        maxWidth,
        maxHeight,
        quality,
        watermarkJson: JSON.stringify({ enabled: watermarkEnabled, text: watermarkText, mode: watermarkMode, opacity, fontSize, rotation, color }),
        slotConfigJson: JSON.stringify(profile.slots),
      }),
    });
    const data = await response.json().catch(() => ({}));
    setStatus(response.ok ? "Preset saved." : data.error || "Could not save preset.");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>1. Profile and pack details</CardTitle>
            <CardDescription>Choose the marketplace output rules and enter the SKU, product code, or ASIN.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field>
              <Label>Marketplace profile</Label>
              <Select value={profileId} onChange={(event) => {
                const next = marketplaceProfiles.find((item) => item.id === event.target.value) ?? marketplaceProfiles[0];
                if (next.id === "AMAZON" && !limits.amazonProfiles) {
                  setStatus("Amazon profiles require Pro. The Etsy profiles remain available.");
                  return;
                }
                setProfileId(next.id);
                setFilenamePattern(next.defaultFilenamePattern);
                setMaxWidth(next.defaultMaxWidth);
                setMaxHeight(next.defaultMaxHeight);
                setQuality(next.defaultQuality);
                setOutputFormat(next.outputFormat);
              }}>
                {marketplaceProfiles.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label>Pack name</Label>
              <Input value={packName} onChange={(event) => setPackName(event.target.value)} />
            </Field>
            <Field>
              <Label>SKU / ASIN / product code</Label>
              <Input value={sku} onChange={(event) => setSku(event.target.value)} />
            </Field>
            <Field>
              <Label>Filename pattern</Label>
              <Input value={filenamePattern} onChange={(event) => setFilenamePattern(event.target.value)} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Upload and assign slots</CardTitle>
            <CardDescription>{normalizedPlan} allows {limits.maxImagesPerPack} images per pack. Drag files or choose from disk.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageDropzone images={images} setImages={setImages} maxFiles={limits.maxImagesPerPack} />
            <div className="grid gap-3">
              {images.map((image, index) => (
                <div key={image.id} className="grid gap-3 rounded-lg border border-neutral-200 bg-white p-3 md:grid-cols-[88px_1fr_220px_180px]">
                  <Image src={image.previewUrl} alt={image.originalName} width={88} height={88} className="h-22 w-22 rounded-md object-cover" unoptimized />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-neutral-400" />
                      <p className="truncate font-medium text-neutral-950">{image.originalName}</p>
                    </div>
                    <p className="mt-1 text-sm text-neutral-600">{image.width || "?"}x{image.height || "?"} · {formatBytes(image.size)}</p>
                  </div>
                  <Select value={image.assignedSlotId || profile.slots[index]?.id || ""} onChange={(event) => updateImage(image.id, { assignedSlotId: event.target.value })}>
                    {profile.slots.map((slot) => <option key={slot.id} value={slot.id}>{slot.label}</option>)}
                  </Select>
                  <Input placeholder="Custom slot label" value={image.customSlotLabel || ""} onChange={(event) => updateImage(image.id, { customSlotLabel: event.target.value })} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Resize, compress, and watermark</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Field>
              <Label>Resize mode</Label>
              <Select value={resizeMode} onChange={(event) => setResizeMode(event.target.value)}>
                <option value="FIT">Fit within max dimensions</option>
                <option value="SQUARE_CROP">Square crop</option>
                <option value="KEEP_ASPECT">Keep original aspect ratio</option>
              </Select>
            </Field>
            <Field><Label>Max width</Label><Input type="number" value={maxWidth} onChange={(event) => setMaxWidth(Number(event.target.value))} /></Field>
            <Field><Label>Max height</Label><Input type="number" value={maxHeight} onChange={(event) => setMaxHeight(Number(event.target.value))} /></Field>
            <Field><Label>Quality: {quality}</Label><Input type="range" min={60} max={95} value={quality} onChange={(event) => setQuality(Number(event.target.value))} /></Field>
            <Field>
              <Label>Output format</Label>
              <Select value={outputFormat} onChange={(event) => setOutputFormat(event.target.value as "jpeg" | "webp")}>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
              </Select>
            </Field>
            <Field>
              <Label>Watermark mode</Label>
              <Select value={watermarkMode} onChange={(event) => setWatermarkMode(event.target.value)}>
                <option value="DIAGONAL_REPEAT">Diagonal repeated</option>
                <option value="CENTER">Center</option>
                <option value="BOTTOM_RIGHT">Bottom-right</option>
              </Select>
            </Field>
            <Field className="md:col-span-2"><Label>Watermark text</Label><Input value={watermarkText} onChange={(event) => setWatermarkText(event.target.value)} /></Field>
            <Field><Label>Enabled</Label><Select value={String(watermarkEnabled)} onChange={(event) => setWatermarkEnabled(event.target.value === "true")}><option value="true">Yes</option><option value="false">No</option></Select></Field>
            <Field><Label>Opacity: {opacity}</Label><Input type="range" min={0} max={1} step={0.01} value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} /></Field>
            <Field><Label>Font size</Label><Input type="number" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} /></Field>
            <Field><Label>Rotation</Label><Input type="number" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} /></Field>
            <Field><Label>Color</Label><Input type="color" value={color} onChange={(event) => setColor(event.target.value)} /></Field>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Filename preview</CardTitle>
                <CardDescription>Review final output names before export.</CardDescription>
              </div>
              <Badge>{profile.label}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[480px] overflow-auto rounded-md border border-neutral-200">
              {filenamePreview.length ? filenamePreview.map((row) => (
                <div key={row.id} className="border-b border-neutral-200 p-3 text-sm last:border-b-0">
                  <p className="font-medium text-neutral-950">{row.output}</p>
                  <p className="mt-1 text-neutral-600">{row.original} · {row.slot}</p>
                </div>
              )) : <p className="p-4 text-sm text-neutral-600">Upload images to preview filenames.</p>}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Button onClick={exportZip}><Download size={17} /> Export ZIP</Button>
              <Button variant="secondary" onClick={savePreset}><Save size={17} /> Save preset</Button>
              {status ? <p className="rounded-md border border-neutral-200 bg-stone-50 p-3 text-sm text-neutral-700">{status}</p> : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
