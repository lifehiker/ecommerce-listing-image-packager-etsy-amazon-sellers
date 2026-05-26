import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GuidePage({ title, description, checklist }: { title: string; description: string; checklist: string[] }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-neutral-950">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-700">{description}</p>
      <Card className="mt-8">
        <CardHeader><CardTitle>Practical checklist</CardTitle></CardHeader>
        <CardContent>
          <ul className="grid gap-3 text-neutral-700">
            {checklist.map((item) => <li key={item} className="rounded-md border border-neutral-200 bg-stone-50 p-3">{item}</li>)}
          </ul>
        </CardContent>
      </Card>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/app/packs/new">Create a full pack</ButtonLink>
        <ButtonLink href="/tools" variant="secondary">View free tools</ButtonLink>
      </div>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link className="rounded-md border border-neutral-200 bg-white px-3 py-2" href="/tools/watermark-cross-stitch-pattern">Watermark tool</Link>
        <Link className="rounded-md border border-neutral-200 bg-white px-3 py-2" href="/tools/bulk-product-photo-renamer">SKU renamer</Link>
        <Link className="rounded-md border border-neutral-200 bg-white px-3 py-2" href="/tools/listing-image-packager">Image packager</Link>
      </div>
    </main>
  );
}
