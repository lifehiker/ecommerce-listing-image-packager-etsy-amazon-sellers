"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Label } from "@/components/ui/form";
import { renderFilename } from "@/lib/filename-patterns";

export function FreeRenamer({ maxFiles = 5 }: { maxFiles?: number }) {
  const [sku, setSku] = useState("SKU-001");
  const [pattern, setPattern] = useState("{sku}-{slotNumber}-{original}.jpg");
  const [files, setFiles] = useState<File[]>([]);
  const preview = useMemo(() => files.slice(0, maxFiles).map((file, index) => renderFilename({ pattern, sku, asin: sku, slotNumber: index + 1, slotName: `Image ${index + 1}`, original: file.name, profile: "ETSY_DIGITAL" })), [files, maxFiles, pattern, sku]);
  return (
    <Card>
      <CardHeader><CardTitle>SKU filename preview</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field><Label>SKU / ASIN</Label><Input value={sku} onChange={(event) => setSku(event.target.value)} /></Field>
        <Field><Label>Pattern</Label><Input value={pattern} onChange={(event) => setPattern(event.target.value)} /></Field>
        <Field className="md:col-span-2"><Label>Choose up to {maxFiles} files</Label><Input type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, maxFiles))} /></Field>
        <div className="md:col-span-2 rounded-md border border-neutral-200 bg-stone-50 p-4">
          {preview.length ? preview.map((name, index) => <p key={name} className="text-sm"><span className="text-neutral-500">{files[index].name}</span> {"->"} <strong>{name}</strong></p>) : <p className="text-sm text-neutral-600">Select files to preview renamed outputs.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
