import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 p-8">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-950">ListingPackr</h1>
          <p className="mt-2 text-neutral-600">
            <Link href="/login" className="underline">Sign in</Link> to access your dashboard, presets, and image packs.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-stone-50 lg:flex">
      <AppSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
