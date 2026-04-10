import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-4 text-center">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-800">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
};
