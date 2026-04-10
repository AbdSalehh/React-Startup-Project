import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoadingAction, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    username: "",
    nickname: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch {
      // error is handled in store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="Choose a username"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="nickname" className="mb-1 block text-sm font-medium">
          Nickname
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={form.nickname}
          onChange={handleChange}
          required
          placeholder="Choose a nickname"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Choose a password"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoadingAction}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {isLoadingAction ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;
