import { FreeWatermarker } from "@/components/tools/free-watermarker";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Watermark Cross Stitch Patterns for Etsy | Free Tool",
  description: "Prepare Etsy digital pattern images faster. Resize, watermark, rename by SKU, and export listing-ready image packs.",
};

export default function Page() {
  return (
    <ToolShell title="Watermark cross stitch pattern" description="Preview diagonal, center, or bottom-right text watermarks for pattern screenshots before exporting a full listing image pack.">
      <FreeWatermarker />
    </ToolShell>
  );
}
