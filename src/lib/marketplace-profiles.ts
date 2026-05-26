export type MarketplaceProfileId = "ETSY_DIGITAL" | "ETSY_PHYSICAL" | "AMAZON";

export type SlotDefinition = {
  id: string;
  label: string;
  description: string;
  required?: boolean;
};

export type MarketplaceProfile = {
  id: MarketplaceProfileId;
  label: string;
  description: string;
  defaultMaxWidth: number;
  defaultMaxHeight: number;
  defaultQuality: number;
  defaultFilenamePattern: string;
  outputFormat: "jpeg" | "webp";
  slots: SlotDefinition[];
};

export const marketplaceProfiles: MarketplaceProfile[] = [
  {
    id: "ETSY_DIGITAL",
    label: "Etsy digital listing",
    description: "Pattern previews, mockups, detail cards, and what-is-included slides.",
    defaultMaxWidth: 2400,
    defaultMaxHeight: 2400,
    defaultQuality: 82,
    defaultFilenamePattern: "{sku}-{slotNumber}-{slotName}.jpg",
    outputFormat: "jpeg",
    slots: [
      { id: "main", label: "Main image", description: "Primary listing photo", required: true },
      { id: "pattern-preview", label: "Pattern preview", description: "Watermarked chart preview" },
      { id: "finished-mockup", label: "Finished mockup", description: "Rendered or stitched result" },
      { id: "detail-close-up", label: "Detail close-up", description: "Texture, stitches, or product detail" },
      { id: "size-instructions", label: "Size/instructions", description: "Finished size and download notes" },
      { id: "palette-materials", label: "Palette/materials", description: "Thread palette or materials" },
      { id: "included", label: "What's included", description: "Files, formats, and extras" },
    ],
  },
  {
    id: "ETSY_PHYSICAL",
    label: "Etsy physical product",
    description: "Product, lifestyle, detail, scale, and packaging photos for handmade listings.",
    defaultMaxWidth: 2400,
    defaultMaxHeight: 2400,
    defaultQuality: 84,
    defaultFilenamePattern: "{sku}-{slotNumber}-{slotName}.jpg",
    outputFormat: "jpeg",
    slots: [
      { id: "main", label: "Main image", description: "Clean product hero", required: true },
      { id: "lifestyle", label: "Lifestyle", description: "Product in use" },
      { id: "detail", label: "Detail", description: "Close-up craft detail" },
      { id: "scale", label: "Scale", description: "Size reference" },
      { id: "variations", label: "Variations", description: "Options or colors" },
      { id: "packaging", label: "Packaging", description: "Shipping or gift packaging" },
    ],
  },
  {
    id: "AMAZON",
    label: "Amazon product listing",
    description: "Main, lifestyle, feature, infographic, and dimensions images with ASIN naming.",
    defaultMaxWidth: 2000,
    defaultMaxHeight: 2000,
    defaultQuality: 86,
    defaultFilenamePattern: "{asin}-{slotNumber}.jpg",
    outputFormat: "jpeg",
    slots: [
      { id: "main", label: "Main", description: "White-background primary image", required: true },
      { id: "lifestyle", label: "Lifestyle", description: "Product in context" },
      { id: "feature", label: "Feature", description: "Core selling points" },
      { id: "detail", label: "Detail", description: "Close-up construction detail" },
      { id: "infographic", label: "Infographic", description: "Benefit or comparison graphic" },
      { id: "size-dimensions", label: "Size/dimensions", description: "Measured dimensions" },
    ],
  },
];

export function getMarketplaceProfile(id: string | null | undefined) {
  return marketplaceProfiles.find((profile) => profile.id === id) ?? marketplaceProfiles[0];
}
