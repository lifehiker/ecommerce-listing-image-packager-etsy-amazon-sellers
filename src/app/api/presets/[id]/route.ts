import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in to delete presets." }, { status: 401 });
  const { id } = await params;
  await prisma.preset.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}
