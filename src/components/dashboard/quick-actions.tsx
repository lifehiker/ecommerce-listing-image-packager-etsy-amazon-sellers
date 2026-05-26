import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/app/packs/new">Create new pack</ButtonLink>
        <ButtonLink href="/app/presets" variant="secondary">Manage presets</ButtonLink>
        <ButtonLink href="/tools" variant="secondary">Open free tools</ButtonLink>
      </CardContent>
    </Card>
  );
}
