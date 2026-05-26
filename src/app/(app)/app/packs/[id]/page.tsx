import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const pack = await prisma.imagePack.findFirst({ where: { id, userId: user.id } });
  if (!pack) notFound();
  const manifest = pack.manifestJson ? JSON.parse(pack.manifestJson) as string[][] : [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-950">{pack.name}</h1>
        <p className="mt-1 text-neutral-600">{pack.marketplaceProfile} · {pack.sku} · {pack.status}</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Export manifest</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-md border border-neutral-200">
            {manifest.map((row, index) => (
              <div key={`${row[1]}-${index}`} className="grid min-w-[760px] grid-cols-6 gap-3 border-b border-neutral-200 p-3 text-sm last:border-b-0">
                {row.map((cell) => <span key={cell} className="truncate">{cell}</span>)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
