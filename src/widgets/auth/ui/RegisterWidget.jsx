import { RegisterForm } from "@/features/auth";
import { Seo } from "@/shared/ui/Seo";

export const RegisterWidget = () => {
  return (
    <div>
      <Seo
        title="Create Account"
        description="Create a new account to get started with React Capstone."
        canonical="/register"
        noIndex
      />
      <h1>Create Account</h1>
      <p>Fill in the details below</p>

      <RegisterForm />

      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
};
