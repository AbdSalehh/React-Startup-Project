import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoadingAction, error, clearError } = useAuthStore();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch {
      // error is handled in store
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="Enter your username"
        />
      </div>

      <br />

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
      </div>

      <br />

      <button type="submit" disabled={isLoadingAction}>
        {isLoadingAction ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
