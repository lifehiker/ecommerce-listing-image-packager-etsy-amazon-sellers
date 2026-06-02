"use client";

export default function AppSectionError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-950">ListingPackr</h1>
        <p className="mt-2 text-neutral-600">
          Something went wrong loading this page.{" "}
          <button onClick={reset} className="underline">
            Try again
          </button>
        </p>
      </div>
    </div>
  );
}
