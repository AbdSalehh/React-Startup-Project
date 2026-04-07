import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth";

export const DefaultLayout = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "200px",
          borderRight: "1px solid #ccc",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Admin Panel</h2>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </nav>
          <hr />
          {user && (
            <div>
              <p>
                <strong>{user.name}</strong>
              </p>
              <p>@{user.username}</p>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="cursor-pointer font-bold text-sky-800"
          >
            Logout
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "16px" }}>{children}</main>
    </div>
  );
};
