import { LoginForm } from "@/features/auth";

export const LoginPage = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Sign in to your account</p>

      <LoginForm />

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};
