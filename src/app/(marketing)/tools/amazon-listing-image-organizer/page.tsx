import { OrganizerDemo } from "@/components/tools/organizer-demo";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Amazon Listing Image Organizer Tool | ListingPackr",
  description: "Organize Amazon listing images by slot and package ASIN-ready filenames.",
};

export default function Page() {
  return (
    <ToolShell title="Amazon listing image organizer tool" description="Plan main, lifestyle, feature, detail, infographic, and dimensions slots before exporting ASIN-based filenames in Pro.">
      <OrganizerDemo type="amazon" />
    </ToolShell>
  );
}
