"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Label, Select } from "@/components/ui/form";
import { marketplaceProfiles } from "@/lib/marketplace-profiles";

export function PresetForm() {
  const [message, setMessage] = useState("");
  const [profileId, setProfileId] = useState("ETSY_DIGITAL");
  const profile = marketplaceProfiles.find((item) => item.id === profileId) ?? marketplaceProfiles[0];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/presets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name")),
        marketplaceProfile: profileId,
        filenamePattern: String(form.get("filenamePattern")),
        resizeMode: String(form.get("resizeMode")),
        maxWidth: Number(form.get("maxWidth")),
        maxHeight: Number(form.get("maxHeight")),
        quality: Number(form.get("quality")),
        watermarkJson: JSON.stringify({ enabled: true, text: String(form.get("watermarkText")), mode: "DIAGONAL_REPEAT", opacity: 0.18, fontSize: 42, rotation: -28, color: "#111111" }),
        slotConfigJson: JSON.stringify(profile.slots),
      }),
    });
    const data = await response.json().catch(() => ({}));
    setMessage(response.ok ? "Preset saved." : data.error || "Could not save preset.");
  }

  return (
    <Card>
      <CardHeader><CardTitle>Save a preset</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <Field><Label>Name</Label><Input name="name" defaultValue="Etsy pattern watermark preset" required /></Field>
          <Field>
            <Label>Profile</Label>
            <Select value={profileId} onChange={(event) => setProfileId(event.target.value)}>
              {marketplaceProfiles.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </Select>
          </Field>
          <Field><Label>Filename pattern</Label><Input name="filenamePattern" defaultValue={profile.defaultFilenamePattern} required /></Field>
          <Field><Label>Resize mode</Label><Select name="resizeMode" defaultValue="FIT"><option value="FIT">Fit within max dimensions</option><option value="SQUARE_CROP">Square crop</option><option value="KEEP_ASPECT">Keep aspect</option></Select></Field>
          <Field><Label>Max width</Label><Input name="maxWidth" type="number" defaultValue={profile.defaultMaxWidth} /></Field>
          <Field><Label>Max height</Label><Input name="maxHeight" type="number" defaultValue={profile.defaultMaxHeight} /></Field>
          <Field><Label>Quality</Label><Input name="quality" type="number" min={60} max={95} defaultValue={profile.defaultQuality} /></Field>
          <Field><Label>Watermark text</Label><Input name="watermarkText" defaultValue="Sample - do not copy" /></Field>
          <div className="md:col-span-2"><Button>Save preset</Button></div>
          {message ? <p className="md:col-span-2 rounded-md border border-neutral-200 bg-stone-50 p-3 text-sm">{message}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
