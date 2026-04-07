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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Full Name</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <br />

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
          placeholder="Choose a username"
        />
      </div>

      <br />

      <div>
        <label htmlFor="nickname">Nickname</label>
        <br />
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={form.nickname}
          onChange={handleChange}
          required
          placeholder="Choose a nickname"
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
          placeholder="Choose a password"
        />
      </div>

      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={isLoadingAction}>
        {isLoadingAction ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;
