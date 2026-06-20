import Link from "next/link";
import { AuthLayout } from "@/components/layout/auth-layout";
import { RegisterForm } from "@/components/shared/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start generating AI-powered cloud architecture recommendations."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-glow-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
