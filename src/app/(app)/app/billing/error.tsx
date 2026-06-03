"use client";

export default function BillingError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-950">Billing</h1>
        <p className="mt-1 text-neutral-600">Upgrade for larger batches, saved presets, and Amazon profiles.</p>
      </div>
      <p className="text-sm text-neutral-600">
        Could not load billing.{" "}
        <button onClick={reset} className="underline">
          Try again
        </button>
      </p>
    </div>
  );
}
