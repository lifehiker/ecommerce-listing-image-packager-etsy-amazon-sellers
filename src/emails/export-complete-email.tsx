export function ExportCompleteEmail({ packName }: { packName: string }) {
  return (
    <main>
      <h1>{packName} is ready</h1>
      <p>Your processed images and manifest have been packaged for download.</p>
    </main>
  );
}
