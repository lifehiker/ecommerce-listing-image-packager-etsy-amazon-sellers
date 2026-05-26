import sharp from "sharp";

export type ResizeMode = "FIT" | "SQUARE_CROP" | "KEEP_ASPECT";
export type WatermarkMode = "DIAGONAL_REPEAT" | "CENTER" | "BOTTOM_RIGHT";

export type WatermarkSettings = {
  enabled: boolean;
  text: string;
  mode: WatermarkMode;
  opacity: number;
  fontSize: number;
  rotation: number;
  color: string;
};

export type ProcessingSettings = {
  resizeMode: ResizeMode;
  maxWidth: number;
  maxHeight: number;
  quality: number;
  outputFormat: "jpeg" | "webp";
  watermark: WatermarkSettings;
};

export async function processImage(buffer: Buffer, settings: ProcessingSettings) {
  const metadata = await sharp(buffer).metadata();
  let pipeline = sharp(buffer).rotate();

  if (settings.resizeMode === "SQUARE_CROP") {
    const side = Math.min(settings.maxWidth, settings.maxHeight);
    pipeline = pipeline.resize(side, side, { fit: "cover", position: "attention" });
  } else if (settings.resizeMode === "FIT") {
    pipeline = pipeline.resize(settings.maxWidth, settings.maxHeight, { fit: "inside", withoutEnlargement: true });
  } else {
    pipeline = pipeline.resize({ width: settings.maxWidth, withoutEnlargement: true });
  }

  const resized = await pipeline.toBuffer();
  const afterResize = await sharp(resized).metadata();
  let withWatermark = sharp(resized);

  if (settings.watermark.enabled && settings.watermark.text.trim()) {
    withWatermark = withWatermark.composite([
      {
        input: Buffer.from(createWatermarkSvg(afterResize.width ?? metadata.width ?? 1200, afterResize.height ?? metadata.height ?? 1200, settings.watermark)),
        blend: "over",
      },
    ]);
  }

  const output =
    settings.outputFormat === "webp"
      ? await withWatermark.webp({ quality: settings.quality }).toBuffer()
      : await withWatermark.jpeg({ quality: settings.quality, mozjpeg: true }).toBuffer();
  const finalMetadata = await sharp(output).metadata();

  return {
    buffer: output,
    width: finalMetadata.width ?? afterResize.width ?? metadata.width ?? 0,
    height: finalMetadata.height ?? afterResize.height ?? metadata.height ?? 0,
    size: output.length,
  };
}

function createWatermarkSvg(width: number, height: number, watermark: WatermarkSettings) {
  const color = sanitizeColor(watermark.color);
  const opacity = Math.max(0, Math.min(1, watermark.opacity));
  const fontSize = Math.max(12, Math.min(160, watermark.fontSize));
  const text = escapeXml(watermark.text);

  if (watermark.mode === "CENTER") {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" transform="rotate(${watermark.rotation} ${width / 2} ${height / 2})" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="${color}" fill-opacity="${opacity}">${text}</text></svg>`;
  }

  if (watermark.mode === "BOTTOM_RIGHT") {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><text x="${width - 32}" y="${height - 32}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="${color}" fill-opacity="${opacity}">${text}</text></svg>`;
  }

  const stepX = Math.max(220, fontSize * 7);
  const stepY = Math.max(160, fontSize * 5);
  const texts: string[] = [];
  for (let y = -height; y < height * 2; y += stepY) {
    for (let x = -width; x < width * 2; x += stepX) {
      texts.push(`<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="${color}" fill-opacity="${opacity}">${text}</text>`);
    }
  }
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${watermark.rotation || -28} ${width / 2} ${height / 2})">${texts.join("")}</g></svg>`;
}

function sanitizeColor(color: string) {
  return /^#[0-9a-f]{6}$/i.test(color) ? color : "#111111";
}

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (char) => {
    const map: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "\"": "&quot;",
      "'": "&apos;",
    };
    return map[char] ?? char;
  });
}
