import { OrganizerDemo } from "@/components/tools/organizer-demo";
import { ToolShell } from "@/components/tools/tool-shell";

export const metadata = {
  title: "Etsy Cross Stitch Listing Photos Checklist | ListingPackr",
  description: "Plan Etsy cross stitch listing photo order and create a full image pack.",
};

export default function Page() {
  return (
    <ToolShell title="Etsy cross stitch listing photos" description="Use a practical listing order: main image, watermarked pattern preview, finished mockup, details, size, materials, and what is included.">
      <OrganizerDemo type="etsy" />
    </ToolShell>
  );
}
