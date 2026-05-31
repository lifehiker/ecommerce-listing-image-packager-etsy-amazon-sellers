"use client";

export default function PresetsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-950">Presets</h1>
        <p className="mt-1 text-neutral-600">Save repeat profile, filename, resize, compression, watermark, and slot settings.</p>
      </div>
      <p className="text-sm text-neutral-600">
        Could not load presets.{" "}
        <button onClick={reset} className="underline">
          Try again
        </button>
      </p>
    </div>
  );
}
