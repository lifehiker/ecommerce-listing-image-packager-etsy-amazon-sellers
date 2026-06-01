"use client";

export default function BlogPostError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-neutral-950">How to create a marketplace-ready listing image pack</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-700">
        The clean workflow is simple: collect source images, choose marketplace slots, apply repeat settings, preview filenames, export a ZIP, and keep a manifest.
      </p>
      <p className="mt-8 text-sm text-neutral-600">
        Page failed to load.{" "}
        <button onClick={reset} className="underline">
          Try again
        </button>
      </p>
    </main>
  );
}
