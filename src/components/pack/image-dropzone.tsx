"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { makeUploadedImage, validateImageFile, type UploadedImage } from "@/lib/client-image-utils";

export function ImageDropzone({ images, setImages, maxFiles }: { images: UploadedImage[]; setImages: (images: UploadedImage[]) => void; maxFiles: number }) {
  async function addFiles(files: FileList | File[]) {
    const next = [...images];
    for (const file of Array.from(files)) {
      const error = validateImageFile(file);
      if (error) {
        window.alert(`${file.name}: ${error}`);
        continue;
      }
      if (next.length >= maxFiles) {
        window.alert(`This plan allows ${maxFiles} images per pack.`);
        break;
      }
      next.push(await makeUploadedImage(file, next.length));
    }
    setImages(next);
  }

  return (
    <label
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        void addFiles(event.dataTransfer.files);
      }}
      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-stone-50 px-4 py-10 text-center hover:bg-stone-100"
    >
      <Upload className="h-8 w-8 text-teal-700" />
      <span className="mt-3 font-medium text-neutral-950">Drop product images here</span>
      <span className="mt-1 text-sm text-neutral-600">JPG, PNG, and WebP up to 20 MB each</span>
      <Button type="button" variant="secondary" className="mt-4">Choose files</Button>
      <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => event.target.files && void addFiles(event.target.files)} />
    </label>
  );
}
