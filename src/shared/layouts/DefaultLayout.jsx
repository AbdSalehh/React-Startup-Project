import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { Sun, Moon, LogOut } from "lucide-react";
import { useAuthStore } from "@/entities/auth";
import { useTheme } from "@/shared/hooks";

export const DefaultLayout = ({ children }) => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100`}
    >
      <aside
        className={`flex w-52 flex-col justify-between border-r border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800`}
      >
        <div>
          <h2 className="mb-4 text-xl font-bold">Admin Panel</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  Home
                </a>
              </li>
            </ul>
          </nav>
          <hr className="my-4 border-neutral-200 dark:border-neutral-700" />
          {user && (
            <div className="space-y-1">
              <p className="font-semibold">{user.name}</p>
              <p className="text-neutral-600 dark:text-neutral-400">
                @{user.username}
              </p>
              <p className="text-xs text-neutral-500">{user.role}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-2 font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
          >
            {isDark ? (
              <>
                <Sun size={18} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Dark Mode</span>
              </>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500 bg-red-50 px-3 py-2 font-semibold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-neutral-50 p-4 dark:bg-neutral-900">
        {children}
      </main>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
