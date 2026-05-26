"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PlanCard({ plan, currentPlan }: { plan: "SOLO" | "PRO"; currentPlan: string }) {
  const [message, setMessage] = useState("");

  async function checkout() {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await response.json().catch(() => ({}));
    if (data.url) window.location.href = data.url;
    else setMessage(data.error || "Checkout is unavailable.");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan === "SOLO" ? "Solo" : "Pro"}</CardTitle>
        <CardDescription>{plan === "SOLO" ? "100 images/month, Etsy workflows, 3 presets." : "500 images/month, Amazon workflows, unlimited presets."}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={checkout} disabled={currentPlan === plan}>{currentPlan === plan ? "Current plan" : `Upgrade to ${plan}`}</Button>
        {message ? <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{message}</p> : null}
      </CardContent>
    </Card>
  );
}
