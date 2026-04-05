import { useAuthStore } from '@/entities/auth';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-indigo-600">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/users"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
          >
            Users
          </a>
        </nav>
        <div className="px-4 py-4 border-t border-gray-100">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-gray-400 truncate">@{user.username}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 border border-red-200"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
