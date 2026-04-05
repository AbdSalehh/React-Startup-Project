import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/user";
import { useAuthStore } from "../../entities/auth";
import { tokenService } from "../../shared/lib/tokenService";

export const UsersList = () => {
  const { users, metadata, isLoading, error, fetchUsers } = useUserStore();
  const { getMe } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchUsers({
      limit,
      skip: currentPage * limit,
      select: "firstName,age,email,image",
    });
  }, [currentPage]);

  const handleNextPage = () => {
    if (metadata && currentPage * limit + limit < metadata.total) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchApi = async () => {
    await getMe();
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <button
          onClick={fetchApi}
          className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          Refresh
        </button>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Users List</h2>
        {metadata && (
          <p className="text-sm text-gray-500">
            Showing {metadata.skip + 1}-
            {Math.min(metadata.skip + metadata.limit, metadata.total)} of{" "}
            {metadata.total}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 transition hover:bg-gray-50"
          >
            {user.image && (
              <img
                src={user.image}
                alt={user.firstName}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{user.firstName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">
                {user.age} years
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={!metadata || currentPage * limit + limit >= metadata.total}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
