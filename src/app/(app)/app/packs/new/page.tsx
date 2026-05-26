import { PackWizard } from "@/components/pack/pack-wizard";
import { requireUser } from "@/lib/auth";

export default async function NewPackPage() {
  const user = await requireUser();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-950">Create image pack</h1>
        <p className="mt-1 text-neutral-600">Upload, order, resize, watermark, rename, and export listing-ready images.</p>
      </div>
      <PackWizard plan={user.plan} />
    </div>
  );
}
