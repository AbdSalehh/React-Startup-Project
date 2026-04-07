import { useAuthStore } from "@/entities/auth";
import { RBACGuard } from "@/features/ui";
import { ROLES } from "@/shared/lib/rbac";

export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <h1>Welcome back{user ? `, ${user.nickname || user.name}!` : "!"}</h1>
      <p>Here's your dashboard overview.</p>

      <table border="1" cellPadding="8">
        <tbody>
          <tr>
            <td>
              <strong>Full Name</strong>
            </td>
            <td>{user?.name ?? "—"}</td>
          </tr>
          <tr>
            <td>
              <strong>Username</strong>
            </td>
            <td>@{user?.username ?? "—"}</td>
          </tr>
          <tr>
            <td>
              <strong>Nickname</strong>
            </td>
            <td>{user?.nickname ?? "—"}</td>
          </tr>
          <tr>
            <td>
              <strong>Role</strong>
            </td>
            <td>{user?.role ?? "—"}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* USER Role Content */}
      <RBACGuard requiredRoles={[ROLES.USER]}>
        <div
          style={{
            padding: "16px",
            border: "2px solid green",
            marginBottom: "16px",
          }}
        >
          <h2>👤 USER Dashboard</h2>
          <p>You have basic user access.</p>
          <ul>
            <li>View your profile</li>
            <li>Update your settings</li>
            <li>Access basic features</li>
          </ul>
        </div>
      </RBACGuard>

      {/* ADMIN Role Content */}
      <RBACGuard requiredRoles={[ROLES.ADMIN]}>
        <div
          style={{
            padding: "16px",
            border: "2px solid blue",
            marginBottom: "16px",
          }}
        >
          <h2>🛡️ ADMIN Dashboard</h2>
          <p>You have administrator access.</p>
          <ul>
            <li>Manage users</li>
            <li>View reports</li>
            <li>Configure settings</li>
            <li>Access admin tools</li>
          </ul>
        </div>
      </RBACGuard>

      {/* SUPERADMIN Role Content */}
      <RBACGuard requiredRoles={[ROLES.SUPERADMIN]}>
        <div
          style={{
            padding: "16px",
            border: "2px solid red",
            marginBottom: "16px",
          }}
        >
          <h2>👑 SUPERADMIN Dashboard</h2>
          <p>You have full system access.</p>
          <ul>
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
