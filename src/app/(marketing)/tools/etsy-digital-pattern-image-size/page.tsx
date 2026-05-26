import { FreeResizer } from "@/components/tools/free-resizer";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Etsy Digital Pattern Image Size Guide + Free Resizer | ListingPackr",
  description: "Prepare Etsy digital pattern images faster with a free resizer and batch listing image pack workflow.",
};

export default function Page() {
  return (
    <ToolShell title="Etsy digital pattern image size guide + free resizer" description="Use a configurable listing-image preset instead of hardcoded claims. Fit one image within your chosen dimensions, then batch package the rest.">
      <FreeResizer />
    </ToolShell>
  );
}
