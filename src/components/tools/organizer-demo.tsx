"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/form";

export function OrganizerDemo({ type = "amazon" }: { type?: "amazon" | "etsy" }) {
  const defaults = type === "amazon" ? ["Main", "Lifestyle", "Feature", "Detail", "Infographic", "Size/dimensions"] : ["Main image", "Pattern preview", "Finished mockup", "Detail close-up", "Palette/materials", "What's included"];
  const [slots, setSlots] = useState(defaults);
  return (
    <Card>
      <CardHeader><CardTitle>{type === "amazon" ? "Amazon" : "Etsy"} slot ordering demo</CardTitle></CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        {slots.map((slot, index) => (
          <div key={index} className="rounded-md border border-neutral-200 bg-stone-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase text-neutral-500">Slot {index + 1}</p>
            <Input value={slot} onChange={(event) => setSlots(slots.map((value, i) => i === index ? event.target.value : value))} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
