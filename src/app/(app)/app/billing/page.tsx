import { PlanCard } from "@/components/billing/plan-card";
import { UsageLimits } from "@/components/billing/usage-limits";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth";
import { getMonthlyImageUsage } from "@/lib/usage";

export default async function BillingPage() {
  const user = await requireUser();
  const used = await getMonthlyImageUsage(user.id).catch(() => 0);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-950">Billing</h1>
          <p className="mt-1 text-neutral-600">Upgrade for larger batches, saved presets, and Amazon profiles.</p>
        </div>
        <Badge>{user.plan} plan</Badge>
      </div>
      <UsageLimits plan={user.plan} used={used} />
      <div className="grid gap-4 md:grid-cols-2">
        <PlanCard plan="SOLO" currentPlan={user.plan} />
        <PlanCard plan="PRO" currentPlan={user.plan} />
      </div>
    </div>
  );
}
