import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/lib/plans";

export function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Pricing</p>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Plans for repeated listing prep</h2>
        <p className="mt-3 text-neutral-600">Start with free utilities. Upgrade when batch packaging, saved presets, and higher limits save real production time.</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={plan.key === "SOLO" ? "border-teal-500 shadow-md" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-3">
                <span className="text-3xl font-semibold text-neutral-950">{plan.price}</span>
                <span className="text-sm text-neutral-500">/{plan.cadence}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-teal-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/signup" className="mt-5 w-full" variant={plan.key === "FREE" ? "secondary" : "primary"}>
                {plan.key === "FREE" ? "Use free tools" : "Start trial"}
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
