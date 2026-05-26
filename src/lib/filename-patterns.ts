import { titleCase } from "@/lib/utils";

export type FilenameInput = {
  pattern: string;
  sku?: string;
  asin?: string;
  slotNumber: number;
  slotName: string;
  original: string;
  profile: string;
  extension?: string;
};

export function sanitizeFilename(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 140);
}

export function stripExtension(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

export function renderFilename(input: FilenameInput) {
  const slotNumber = String(input.slotNumber).padStart(2, "0");
  const replacements: Record<string, string> = {
    sku: input.sku || "SKU",
    asin: input.asin || input.sku || "ASIN",
    slotNumber,
    slotName: titleCase(input.slotName),
    original: stripExtension(input.original),
    profile: input.profile,
  };

  let rendered = input.pattern;
  for (const [token, value] of Object.entries(replacements)) {
    rendered = rendered.replaceAll(`{${token}}`, value);
  }

  const extension = input.extension ?? "jpg";
  const withoutExtension = rendered.replace(/\.(jpg|jpeg|webp|png)$/i, "");
  return `${sanitizeFilename(withoutExtension)}.${extension}`;
}
