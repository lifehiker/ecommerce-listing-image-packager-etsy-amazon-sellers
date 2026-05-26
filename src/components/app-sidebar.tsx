import Link from "next/link";
import { CreditCard, LayoutDashboard, PackagePlus, SlidersHorizontal } from "lucide-react";

const links = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/packs/new", label: "New Pack", icon: PackagePlus },
  { href: "/app/presets", label: "Presets", icon: SlidersHorizontal },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
];

export function AppSidebar() {
  return (
    <aside className="border-b border-neutral-200 bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-16 items-center border-b border-neutral-200 px-5 font-semibold">ListingPackr</div>
      <nav className="flex gap-2 overflow-x-auto p-3 lg:flex-col">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950">
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
