export type PlanKey = "FREE" | "SOLO" | "PRO";

export type PlanLimits = {
  monthlyImages: number;
  maxImagesPerPack: number;
  savedPresets: number;
  amazonProfiles: boolean;
  manifestCsv: boolean;
};

export const planLimits: Record<PlanKey, PlanLimits> = {
  FREE: {
    monthlyImages: 10,
    maxImagesPerPack: 5,
    savedPresets: 0,
    amazonProfiles: false,
    manifestCsv: true,
  },
  SOLO: {
    monthlyImages: 100,
    maxImagesPerPack: 25,
    savedPresets: 3,
    amazonProfiles: false,
    manifestCsv: true,
  },
  PRO: {
    monthlyImages: 500,
    maxImagesPerPack: 100,
    savedPresets: Number.POSITIVE_INFINITY,
    amazonProfiles: true,
    manifestCsv: true,
  },
};

export const pricingPlans = [
  {
    key: "FREE",
    name: "Free Tools",
    price: "$0",
    cadence: "forever",
    description: "Single-use utilities and one small pack export.",
    features: ["Single-image resize", "Single-image watermark", "Rename up to 5 files", "5 images per pack"],
  },
  {
    key: "SOLO",
    name: "Solo",
    price: "$19",
    cadence: "month",
    description: "For Etsy sellers publishing new designs regularly.",
    features: ["100 processed images/month", "25 images per pack", "3 saved presets", "Watermark templates"],
  },
  {
    key: "PRO",
    name: "Pro",
    price: "$39",
    cadence: "month",
    description: "For high-volume sellers, assistants, and Amazon workflows.",
    features: ["500 processed images/month", "100 images per pack", "Amazon profiles", "Unlimited presets"],
  },
  {
    key: "HOBBY",
    name: "Hobby Annual",
    price: "$99",
    cadence: "year",
    description: "A seasonal Etsy-only annual plan.",
    features: ["300 processed images/year", "Etsy profiles", "5 saved presets", "No Amazon profiles"],
  },
] as const;

export function normalizePlan(plan?: string | null): PlanKey {
  if (plan === "SOLO" || plan === "PRO") return plan;
  return "FREE";
}
