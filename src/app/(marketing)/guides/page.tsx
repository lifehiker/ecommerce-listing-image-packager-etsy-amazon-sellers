import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guides = [
  ["Sell Cross Stitch Patterns on Etsy", "/guides/sell-cross-stitch-patterns-on-etsy"],
  ["Amazon Image Requirements Workflow", "/guides/amazon-image-requirements"],
];

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-neutral-950">Marketplace image guides</h1>
      <p className="mt-4 text-lg text-neutral-700">Workflow-first guides for listing photos, watermarking, compression, filename rules, and ZIP handoff.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {guides.map(([title, href]) => (
          <Link href={href} key={href}>
            <Card className="h-full hover:border-teal-500">
              <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-neutral-600">Read the checklist and open related free tools.</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
