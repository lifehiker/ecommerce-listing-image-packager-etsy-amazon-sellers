import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create your workspace</CardTitle>
          <CardDescription>Start with free tools and export your first small listing image pack.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" />
          <p className="mt-4 text-center text-sm text-neutral-600">
            Already have an account? <Link className="font-medium text-neutral-950" href="/login">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
