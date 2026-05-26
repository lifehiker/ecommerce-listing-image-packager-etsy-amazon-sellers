export async function sendWelcomeEmail(to: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set, skipping welcome email");
    return { skipped: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: process.env.EMAIL_FROM || "ListingPackr <noreply@example.com>",
    to,
    subject: "Welcome to ListingPackr",
    html: `<p>Hi ${escapeHtml(name)},</p><p>Your ListingPackr workspace is ready. Create a pack, upload images, apply SKU naming, and export a marketplace-ready ZIP.</p>`,
  });
}

export async function sendExportCompleteEmail(to: string, packName: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set, skipping export email");
    return { skipped: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: process.env.EMAIL_FROM || "ListingPackr <noreply@example.com>",
    to,
    subject: "Your image pack export is complete",
    html: `<p>Your image pack ${escapeHtml(packName)} has finished exporting.</p>`,
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;",
    };
    return entities[char] ?? char;
  });
}
