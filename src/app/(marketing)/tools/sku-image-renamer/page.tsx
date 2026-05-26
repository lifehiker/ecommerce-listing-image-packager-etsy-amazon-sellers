import { FreeRenamer } from "@/components/tools/free-renamer";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "SKU Image Renamer Tool | ListingPackr",
  description: "Preview SKU filename rules for Etsy and Amazon listing image workflows.",
};

export default function Page() {
  return (
    <ToolShell title="SKU image renamer" description="Test filename patterns such as {sku}-{slotNumber}-{slotName}.jpg before applying them to a full ZIP export.">
      <FreeRenamer maxFiles={5} />
    </ToolShell>
  );
}
