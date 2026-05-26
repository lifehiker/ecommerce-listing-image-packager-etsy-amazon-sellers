import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizePlan, planLimits } from "@/lib/plans";

export function UsageCard({ plan, used }: { plan: string | null; used: number }) {
  const normalized = normalizePlan(plan);
  const limit = planLimits[normalized].monthlyImages;
  const pct = Math.min(100, Math.round((used / limit) * 100));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-semibold">{used}</span>
          <span className="text-sm text-neutral-600">of {limit} images</span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-neutral-200">
          <div className="h-2 rounded-full bg-teal-700" style={{ width: `${pct}%` }} />
        </div>
      </CardContent>
    </Card>
  );
}
