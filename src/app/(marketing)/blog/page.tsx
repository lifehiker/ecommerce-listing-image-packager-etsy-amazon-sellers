import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-neutral-950">ListingPackr blog</h1>
      <p className="mt-4 text-lg text-neutral-700">Launch notes and practical workflows for Etsy and Amazon image preparation.</p>
      <Link href="/blog/how-to-create-a-marketplace-ready-listing-image-pack">
        <Card className="mt-8 hover:border-teal-500">
          <CardHeader><CardTitle>How to create a marketplace-ready listing image pack</CardTitle></CardHeader>
          <CardContent className="text-sm text-neutral-600">A step-by-step batch workflow from raw images to ordered ZIP export.</CardContent>
        </Card>
      </Link>
    </main>
  );
}
