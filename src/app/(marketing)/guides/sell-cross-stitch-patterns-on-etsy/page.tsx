import { GuidePage } from "@/components/guide-page";

export const metadata = {
  title: "How to Sell Cross Stitch Patterns on Etsy | ListingPackr",
  description: "Workflow guide for cross stitch pattern previews, watermarking, listing photo order, and Etsy image packs.",
};

export default function Page() {
  return (
    <GuidePage
      title="Sell cross stitch patterns on Etsy"
      description="A repeatable listing image workflow helps pattern sellers show the finished design, preview the chart, explain what buyers receive, and reduce copy risk."
      checklist={[
        "Create a main image that shows the finished look or best mockup.",
        "Use a watermarked chart preview that communicates style without revealing the full pattern.",
        "Add detail, size, palette/materials, and what-is-included slides.",
        "Rename files by SKU and slot number so uploads stay organized.",
        "Export a ZIP and manifest to keep every listing batch traceable.",
      ]}
    />
  );
}
