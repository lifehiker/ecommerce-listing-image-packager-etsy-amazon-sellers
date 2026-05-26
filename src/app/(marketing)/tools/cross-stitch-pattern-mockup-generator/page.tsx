import { FreeWatermarker } from "@/components/tools/free-watermarker";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Cross Stitch Pattern Mockup Generator | ListingPackr",
  description: "Create a lightweight cross-stitch preview workflow and package full Etsy pattern image sets.",
};

export default function Page() {
  return (
    <ToolShell title="Cross stitch pattern mockup generator" description="Upload a pattern preview, add a protective watermark overlay, and use the pack builder for complete Etsy pattern listing sets.">
      <FreeWatermarker />
    </ToolShell>
  );
}
