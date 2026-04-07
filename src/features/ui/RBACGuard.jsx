import { useAuthStore } from "@/entities/auth";
import { canAccess } from "@/shared/lib/rbac";

/**
 * RBAC Guard Component
 * Conditionally renders children based on user roles/permissions
 */
export const RBACGuard = ({
  children,
  requiredRoles,
  requiredPermissions,
  fallback = null,
}) => {
  const { user } = useAuthStore();

  const hasAccess = canAccess(user, requiredRoles, requiredPermissions);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
