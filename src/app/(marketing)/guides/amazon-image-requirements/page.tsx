import { GuidePage } from "@/components/guide-page";

export const metadata = {
  title: "Amazon Image Requirements Workflow | ListingPackr",
  description: "Prepare Amazon listing images with ordering, compression, ASIN naming, and a ZIP handoff workflow.",
};

export default function Page() {
  return (
    <GuidePage
      title="Amazon image requirements workflow"
      description="Amazon image prep is easier when assets are ordered by slot, renamed by ASIN or SKU, compressed consistently, and handed off with a manifest."
      checklist={[
        "Start with a clean main image and separate lifestyle, feature, detail, infographic, and size slots.",
        "Keep a configurable max-dimension preset instead of hardcoding requirements that may change.",
        "Use ASIN or SKU filename patterns for handoff to VAs or agencies.",
        "Compress consistently so every image is upload-ready without manual TinyPNG passes.",
        "Use Pro for Amazon profiles, larger batches, and unlimited presets.",
      ]}
    />
  );
}
