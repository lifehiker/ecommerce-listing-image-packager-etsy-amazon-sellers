import Link from "next/link";
import { PackageCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-950 text-white">
            <PackageCheck size={19} />
          </span>
          ListingPackr
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          <Link href="/tools">Tools</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="sm">Sign in</ButtonLink>
          <ButtonLink href="/signup" size="sm">Create pack</ButtonLink>
        </div>
      </div>
    </header>
  );
}
