import { SiteHeader } from "@/components/site-header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader />
      {children}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 sm:px-6 lg:px-8">
          <strong className="text-neutral-950">ListingPackr</strong>
          <span>Marketplace-ready image packs for Etsy digital sellers and Amazon operators.</span>
        </div>
      </footer>
    </div>
  );
}
