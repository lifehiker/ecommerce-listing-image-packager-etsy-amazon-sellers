import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { normalizePlan, planLimits } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

const presetSchema = z.object({
  name: z.string().min(1).max(80),
  marketplaceProfile: z.string(),
  filenamePattern: z.string(),
  resizeMode: z.string(),
  maxWidth: z.coerce.number().int(),
  maxHeight: z.coerce.number().int(),
  quality: z.coerce.number().int(),
  watermarkJson: z.string(),
  slotConfigJson: z.string(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in to view presets." }, { status: 401 });
  const presets = await prisma.preset.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ presets });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in to save presets." }, { status: 401 });

  const plan = normalizePlan(user.plan);
  const limit = planLimits[plan].savedPresets;
  const count = await prisma.preset.count({ where: { userId: user.id } });
  if (count >= limit) return NextResponse.json({ error: "Upgrade to save more presets." }, { status: 403 });

  const parsed = presetSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Preset settings are invalid." }, { status: 400 });

  const preset = await prisma.preset.create({ data: { userId: user.id, ...parsed.data } });
  return NextResponse.json({ preset });
}
