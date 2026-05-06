import { LoginForm } from "@/features/auth";
import { Seo } from "@/shared/ui/Seo";

export const LoginWidget = () => {
  return (
    <div>
      <Seo
        title="Sign In"
        description="Sign in to your account to access the dashboard and all features."
        canonical="/login"
        noIndex
      />
      <h1>Admin Panel</h1>
      <p>Sign in to your account</p>

      <LoginForm />

      <p>
        Don't have an account?{" "}
        <a href="/register" className="cursor-pointer font-bold text-sky-800">
          Register
        </a>
      </p>
    </div>
  );
};
