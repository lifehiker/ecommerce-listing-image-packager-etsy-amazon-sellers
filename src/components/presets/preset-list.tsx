import { Preset } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PresetList({ presets }: { presets: Preset[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Saved presets</CardTitle></CardHeader>
      <CardContent>
        {presets.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {presets.map((preset) => (
              <div key={preset.id} className="rounded-md border border-neutral-200 p-4">
                <p className="font-medium text-neutral-950">{preset.name}</p>
                <p className="mt-1 text-sm text-neutral-600">{preset.marketplaceProfile} · {preset.filenamePattern}</p>
                <p className="mt-2 text-xs text-neutral-500">{preset.maxWidth}x{preset.maxHeight} · quality {preset.quality}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-neutral-600">No saved presets yet. Solo includes 3 presets and Pro includes unlimited presets.</p>}
      </CardContent>
    </Card>
  );
}
