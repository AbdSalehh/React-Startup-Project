import { LoginForm } from "@/features/auth";

export const LoginWidget = () => {
  return (
    <div>
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
