"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Label } from "@/components/ui/form";

export function FreeResizer() {
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState(2400);
  const [height, setHeight] = useState(2400);
  const [message, setMessage] = useState("Choose one image to preview an Etsy-friendly fit-within resize.");
  return (
    <Card>
      <CardHeader><CardTitle>Single-image resize preview</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field><Label>Max width</Label><Input type="number" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></Field>
        <Field><Label>Max height</Label><Input type="number" value={height} onChange={(event) => setHeight(Number(event.target.value))} /></Field>
        <Field className="md:col-span-2"><Label>Image</Label><Input type="file" accept="image/*" onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            setPreview(URL.createObjectURL(file));
            setMessage(`${file.name} will be fit within ${width}x${height} in the full pack exporter.`);
          }
        }} /></Field>
        {preview ? <Image src={preview} alt="Resize preview" width={360} height={240} className="rounded-md border border-neutral-200 object-contain" unoptimized /> : null}
        <div className="rounded-md border border-neutral-200 bg-stone-50 p-4 text-sm text-neutral-700">{message}</div>
        <Button type="button" onClick={() => setMessage("Use the full pack builder to download a processed ZIP with resized output.")}>Preview settings</Button>
      </CardContent>
    </Card>
  );
}
