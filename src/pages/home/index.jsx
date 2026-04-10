import { useAuthStore } from "@/entities/auth";
import { RBACGuard } from "@/features/ui";
import { ROLES } from "@/shared/lib/rbac";

export const HomePage = () => {
  const { user, getMe } = useAuthStore();

  const handleGetMe = async () => {
    await getMe();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">
          Welcome back{user ? `, ${user.nickname || user.name}!` : "!"}
        </h1>
        <p className="text-neutral-600">Here's your dashboard overview.</p>
      </div>

      <table className="w-full max-w-md border border-neutral-300">
        <tbody>
          <tr className="border-b border-neutral-300">
            <td className="bg-neutral-50 p-3 font-semibold dark:bg-neutral-800">
              Full Name
            </td>
            <td className="p-3">{user?.name ?? "—"}</td>
          </tr>
          <tr className="border-b border-neutral-300">
            <td className="bg-neutral-50 p-3 font-semibold dark:bg-neutral-800">
              Username
            </td>
            <td className="p-3">@{user?.username ?? "—"}</td>
          </tr>
          <tr className="border-b border-neutral-300">
            <td className="bg-neutral-50 p-3 font-semibold dark:bg-neutral-800">
              Nickname
            </td>
            <td className="p-3">{user?.nickname ?? "—"}</td>
          </tr>
          <tr>
            <td className="bg-neutral-50 p-3 font-semibold dark:bg-neutral-800">
              Role
            </td>
            <td className="p-3">{user?.role ?? "—"}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleGetMe}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      >
        Get Me
      </button>

      <hr className="border-neutral-300" />

      {/* USER Role Content */}
      <RBACGuard requiredRoles={[ROLES.USER]}>
        <div className="mb-4 rounded-lg border-2 border-green-500 bg-green-50 p-4">
          <h2 className="mb-2 text-xl font-bold text-green-800">
            👤 USER Dashboard
          </h2>
          <p className="mb-3 text-green-700">You have basic user access.</p>
          <ul className="list-inside list-disc space-y-1 text-green-700">
            <li>View your profile</li>
            <li>Update your settings</li>
            <li>Access basic features</li>
          </ul>
        </div>
      </RBACGuard>

      {/* ADMIN Role Content */}
      <RBACGuard requiredRoles={[ROLES.ADMIN]}>
        <div className="mb-4 rounded-lg border-2 border-blue-500 bg-blue-50 p-4">
          <h2 className="mb-2 text-xl font-bold text-blue-800">
            🛡️ ADMIN Dashboard
          </h2>
          <p className="mb-3 text-blue-700">You have administrator access.</p>
          <ul className="list-inside list-disc space-y-1 text-blue-700">
            <li>Manage users</li>
            <li>View reports</li>
            <li>Configure settings</li>
            <li>Access admin tools</li>
          </ul>
        </div>
      </RBACGuard>

      {/* SUPERADMIN Role Content */}
      <RBACGuard requiredRoles={[ROLES.SUPERADMIN]}>
        <div className="mb-4 rounded-lg border-2 border-red-500 bg-red-50 p-4">
          <h2 className="mb-2 text-xl font-bold text-red-800">
            👑 SUPERADMIN Dashboard
          </h2>
          <p className="mb-3 text-red-700">You have full system access.</p>
          <ul className="list-inside list-disc space-y-1 text-red-700">
            <li>Full system control</li>
            <li>Manage all users and admins</li>
            <li>System configuration</li>
            <li>Database management</li>
            <li>Security settings</li>
          </ul>
        </div>
      </RBACGuard>
    </div>
  );
};
