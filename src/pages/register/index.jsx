import { RegisterForm } from "@/features/auth";

export const RegisterPage = () => {
  return (
    <div>
      <h1>Create Account</h1>
      <p>Fill in the details below</p>

      <RegisterForm />

      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
};
