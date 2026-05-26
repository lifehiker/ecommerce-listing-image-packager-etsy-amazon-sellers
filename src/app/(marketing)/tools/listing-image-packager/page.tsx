import { PackageCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Listing Image Packager Tool for Sellers | ListingPackr",
  description: "Create marketplace-ready image packs with resize, watermark, SKU naming, and ZIP export.",
};

export default function Page() {
  return (
    <ToolShell title="Listing image packager" description="The full SaaS workflow for sellers who need repeatable marketplace-ready image folders instead of one-off image utilities.">
      <Card>
        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          {["Upload product images", "Assign marketplace slots", "Export ZIP with manifest"].map((step) => (
            <div key={step} className="rounded-md border border-neutral-200 bg-stone-50 p-4">
              <PackageCheck className="h-6 w-6 text-teal-700" />
              <h2 className="mt-3 font-semibold text-neutral-950">{step}</h2>
              <p className="mt-1 text-sm text-neutral-600">Built for Etsy digital patterns, Etsy physical goods, and Amazon product listings.</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <ButtonLink href="/app/packs/new" className="mt-6">Create a full listing image pack</ButtonLink>
    </ToolShell>
  );
}
