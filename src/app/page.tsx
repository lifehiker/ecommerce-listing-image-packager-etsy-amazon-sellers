import { ArrowRight, FileArchive, Images, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingSection } from "@/components/pricing-section";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader />
      <main>
        <section className="hero-grid border-b border-neutral-200 bg-stone-100">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">ListingPackr</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-neutral-950 sm:text-5xl">
                Create a complete Etsy or Amazon listing image pack in one upload.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-700">
                Resize, compress, watermark, order, rename by SKU or ASIN, and export a ZIP with manifest CSV without stitching together five separate tools.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/app/packs/new" size="lg">Create a pack <ArrowRight size={18} /></ButtonLink>
                <ButtonLink href="/tools" variant="secondary" size="lg">Try free tools</ButtonLink>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="grid gap-3">
                {["SKU-01-main.jpg", "SKU-02-pattern-preview.jpg", "SKU-03-finished-mockup.jpg", "manifest.csv"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-md border border-neutral-200 bg-stone-50 p-4">
                    <div>
                      <p className="font-medium text-neutral-950">{item}</p>
                      <p className="text-sm text-neutral-600">{index === 3 ? "Slot, dimension, size, watermark log" : "2400px JPEG, compressed, ordered"}</p>
                    </div>
                    <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-800">Ready</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { icon: Images, title: "Batch image prep", copy: "Upload JPG, PNG, or WebP images and see thumbnails, dimensions, file sizes, and slot assignments." },
            { icon: ShieldCheck, title: "Pattern-safe watermarking", copy: "Apply diagonal repeated, center, or bottom-right watermarks for cross-stitch and digital pattern previews." },
            { icon: FileArchive, title: "ZIP export", copy: "Export processed images with SKU/ASIN filename rules and a manifest CSV for listing handoff." },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <Icon className="h-6 w-6 text-teal-700" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-neutral-600">{feature.copy}</CardContent>
              </Card>
            );
          })}
        </section>
        <PricingSection />
      </main>
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 sm:px-6 lg:px-8">
          <strong className="text-neutral-950">ListingPackr</strong>
          <span>Marketplace-ready image packs for Etsy digital sellers and Amazon operators.</span>
        </div>
      </footer>
    </div>
  );
}
