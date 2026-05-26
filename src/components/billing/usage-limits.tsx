import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizePlan, planLimits } from "@/lib/plans";

export function UsageLimits({ plan, used }: { plan: string; used: number }) {
  const normalized = normalizePlan(plan);
  const limits = planLimits[normalized];
  return (
    <Card>
      <CardHeader><CardTitle>Current limits</CardTitle></CardHeader>
      <CardContent className="grid gap-3 text-sm text-neutral-700 md:grid-cols-2">
        <p>Images this month: <strong>{used}/{limits.monthlyImages}</strong></p>
        <p>Images per pack: <strong>{limits.maxImagesPerPack}</strong></p>
        <p>Saved presets: <strong>{Number.isFinite(limits.savedPresets) ? limits.savedPresets : "Unlimited"}</strong></p>
        <p>Amazon profiles: <strong>{limits.amazonProfiles ? "Included" : "Pro only"}</strong></p>
      </CardContent>
    </Card>
  );
}
