import { Badge } from "@/components/ui/badge";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentPacks } from "@/components/dashboard/recent-packs";
import { UsageCard } from "@/components/dashboard/usage-card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMonthlyImageUsage } from "@/lib/usage";

export default async function DashboardPage() {
  const user = await requireUser();
  const [usage, packs] = await Promise.all([
    getMonthlyImageUsage(user.id).catch(() => 0),
    prisma.imagePack.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" }, take: 8 }).catch(() => []),
  ]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-950">Dashboard</h1>
          <p className="mt-1 text-neutral-600">Prepare listing image packs and keep repeat settings close.</p>
        </div>
        <Badge>{user.plan} plan</Badge>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <UsageCard plan={user.plan} used={usage} />
        <QuickActions />
      </div>
      <RecentPacks packs={packs} />
    </div>
  );
}
