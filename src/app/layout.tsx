import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ListingPackr | Marketplace Image Packs for Etsy and Amazon",
  description: "Resize, watermark, rename, order, and export Etsy or Amazon listing image packs in one workflow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
