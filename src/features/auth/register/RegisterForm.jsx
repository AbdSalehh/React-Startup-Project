import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoadingAction, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
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
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="First name"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Last name"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="reg-username"
          className="text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="reg-username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="Choose a username"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="reg-password"
          className="text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="reg-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Choose a password"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoadingAction}
        className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoadingAction ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;
