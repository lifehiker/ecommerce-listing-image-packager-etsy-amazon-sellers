import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  ["Etsy Digital Pattern Image Size Guide + Free Resizer", "/tools/etsy-digital-pattern-image-size"],
  ["Watermark Cross Stitch Patterns for Etsy", "/tools/watermark-cross-stitch-pattern"],
  ["Cross Stitch Pattern Mockup Generator", "/tools/cross-stitch-pattern-mockup-generator"],
  ["Etsy Cross Stitch Listing Photos", "/tools/etsy-cross-stitch-listing-photos"],
  ["Bulk Product Photo Renamer", "/tools/bulk-product-photo-renamer"],
  ["SKU Image Renamer", "/tools/sku-image-renamer"],
  ["Amazon Listing Image Organizer", "/tools/amazon-listing-image-organizer"],
  ["Listing Image Packager", "/tools/listing-image-packager"],
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-neutral-950">Free seller image tools</h1>
      <p className="mt-4 max-w-3xl text-lg text-neutral-700">Single-use utilities for resizing, watermarking, SKU renaming, and image ordering. Use the full app when you need batch ZIP export.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {tools.map(([title, href]) => (
          <Link key={href} href={href}>
            <Card className="h-full hover:border-teal-500">
              <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-neutral-600">Open the free tool and then create a full marketplace-ready image pack.</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
