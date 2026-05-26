export type ZipFile = {
  name: string;
  buffer: Buffer;
};

export async function createZip(files: ZipFile[]) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const file of files) {
    zip.file(file.name, file.buffer);
  }
  return Buffer.from(await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}
