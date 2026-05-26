import { ImagePack } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentPacks({ packs }: { packs: ImagePack[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent packs</CardTitle>
      </CardHeader>
      <CardContent>
        {packs.length ? (
          <div className="divide-y divide-neutral-200">
            {packs.map((pack) => (
              <Link key={pack.id} href={`/app/packs/${pack.id}`} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium text-neutral-950">{pack.name}</span>
                <span className="text-neutral-500">{pack.sku}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">No packs yet. Create your first export from the New Pack workflow.</p>
        )}
      </CardContent>
    </Card>
  );
}
