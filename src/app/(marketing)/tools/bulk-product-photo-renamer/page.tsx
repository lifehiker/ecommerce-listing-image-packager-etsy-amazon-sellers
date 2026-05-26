import { FreeRenamer } from "@/components/tools/free-renamer";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Bulk Product Photo Renamer for SKU Images | ListingPackr",
  description: "Rename product photos by SKU and preview marketplace-ready file names before exporting a full image pack.",
};

export default function Page() {
  return (
    <ToolShell title="Bulk product photo renamer for sellers" description="Preview SKU-based names for up to 5 files using tokens like SKU, slot number, original name, and slot label.">
      <FreeRenamer maxFiles={5} />
    </ToolShell>
  );
}
