import { GuidePage } from "@/components/guide-page";

export const metadata = {
  title: "How to Create a Marketplace-Ready Listing Image Pack | ListingPackr",
  description: "Resize, watermark, rename, order, and ZIP marketplace listing images for Etsy or Amazon.",
};

export default function Page() {
  return (
    <GuidePage
      title="How to create a marketplace-ready listing image pack"
      description="The clean workflow is simple: collect source images, choose marketplace slots, apply repeat settings, preview filenames, export a ZIP, and keep a manifest."
      checklist={[
        "Upload only the images needed for this listing batch.",
        "Choose Etsy digital, Etsy physical, or Amazon profile.",
        "Assign slots and custom labels before processing.",
        "Apply resize, compression, watermark, and filename settings.",
        "Download the ZIP and use manifest.csv to verify each output file.",
      ]}
    />
  );
}
