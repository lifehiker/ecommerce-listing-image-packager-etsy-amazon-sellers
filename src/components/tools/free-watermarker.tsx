"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Label, Select } from "@/components/ui/form";

export function FreeWatermarker() {
  const [preview, setPreview] = useState("");
  const [text, setText] = useState("Sample - do not copy");
  const [mode, setMode] = useState("Diagonal repeated");
  return (
    <Card>
      <CardHeader><CardTitle>Watermark preview</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field><Label>Watermark text</Label><Input value={text} onChange={(event) => setText(event.target.value)} /></Field>
        <Field><Label>Placement</Label><Select value={mode} onChange={(event) => setMode(event.target.value)}><option>Diagonal repeated</option><option>Center</option><option>Bottom-right</option></Select></Field>
        <Field className="md:col-span-2"><Label>Pattern preview image</Label><Input type="file" accept="image/*" onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }} /></Field>
        <div className="relative min-h-72 overflow-hidden rounded-md border border-neutral-200 bg-stone-100 md:col-span-2">
          {preview ? <Image src={preview} alt="Watermark preview" fill className="object-contain" unoptimized /> : null}
          <div className={mode === "Bottom-right" ? "absolute bottom-5 right-5 text-xl font-bold text-neutral-950/40" : mode === "Center" ? "absolute inset-0 flex items-center justify-center text-3xl font-bold text-neutral-950/30" : "absolute inset-0 flex -rotate-12 flex-wrap content-center justify-center gap-10 text-2xl font-bold text-neutral-950/20"}>
            {mode === "Diagonal repeated" ? Array.from({ length: 16 }).map((_, index) => <span key={index}>{text}</span>) : text}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
