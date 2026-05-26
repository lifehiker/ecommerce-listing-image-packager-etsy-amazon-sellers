import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Open your ListingPackr dashboard, presets, and recent image packs.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" />
          <p className="mt-4 text-center text-sm text-neutral-600">
            No account? <Link className="font-medium text-neutral-950" href="/signup">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
