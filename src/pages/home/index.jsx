import { useEffect } from "react";
import { useAuthStore } from "@/entities/auth";
import { UsersList } from "@/widgets/admin/UsersList";

export const HomePage = () => {
  const { user, getMe, isLoading } = useAuthStore();

  useEffect(() => {
    if (!user) {
      getMe();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome back{user ? `, ${user.nickname || user.name}!` : "!"}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Here's your dashboard overview.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="mt-1 text-xl font-bold text-gray-800">
            {user?.name ?? "—"}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-sm">
          <p className="text-sm font-medium text-indigo-200">Username</p>
          <p className="mt-1 text-xl font-bold">@{user?.username ?? "—"}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Nickname</p>
          <p className="mt-1 text-lg font-semibold break-all text-gray-800">
            {user?.nickname ?? "—"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <UsersList />
      </div>
    </div>
  );
};
