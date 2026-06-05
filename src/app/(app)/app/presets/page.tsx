import { PresetForm } from "@/components/presets/preset-form";
import { PresetList } from "@/components/presets/preset-list";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PresetsPage() {
  const user = await getCurrentUser();
  const presets = user
    ? await prisma.preset.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } }).catch(() => [])
    : [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-950">Presets</h1>
        <p className="mt-1 text-neutral-600">Save repeat profile, filename, resize, compression, watermark, and slot settings.</p>
      </div>
      <PresetForm />
      <PresetList presets={presets} />
    </div>
  );
}
