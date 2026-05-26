import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ToolShell({ title, description, children, links = [] }: { title: string; description: string; children: React.ReactNode; links?: { href: string; label: string }[] }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Free ListingPackr tool</p>
        <h1 className="mt-2 text-4xl font-semibold text-neutral-950">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
      <Card className="mt-8 bg-neutral-950 text-white">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Create a full listing image pack</h2>
            <p className="mt-1 text-sm text-neutral-300">Batch resize, watermark, order, rename, and export a ZIP with manifest CSV.</p>
          </div>
          <ButtonLink href="/app/packs/new" variant="secondary">Open pack builder</ButtonLink>
        </CardContent>
      </Card>
      {links.length ? (
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          {links.map((link) => <Link key={link.href} className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-700 hover:text-neutral-950" href={link.href}>{link.label}</Link>)}
        </div>
      ) : null}
    </main>
  );
}
