import { nanoid } from "nanoid";

export type UploadedImage = {
  id: string;
  file: File;
  originalName: string;
  previewUrl: string;
  width?: number;
  height?: number;
  size: number;
  assignedSlotId?: string;
  customSlotLabel?: string;
  order: number;
};

export async function makeUploadedImage(file: File, order: number): Promise<UploadedImage> {
  const previewUrl = URL.createObjectURL(file);
  const dimensions: Partial<{ width: number; height: number }> = await readImageDimensions(previewUrl).catch(() => ({}));
  return {
    id: nanoid(),
    file,
    originalName: file.name,
    previewUrl,
    width: dimensions.width,
    height: dimensions.height,
    size: file.size,
    order,
  };
}

export function readImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = src;
  });
}

export function validateImageFile(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return "Only JPG, PNG, and WebP images are supported.";
  if (file.size > 20 * 1024 * 1024) return "Each image must be 20 MB or smaller.";
  return "";
}
