import { LoginForm } from '@/features/auth';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-indigo-600 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-indigo-200">Sign in to your account</p>
        </div>

        <div className="px-8 py-6">
          <LoginForm />
        </div>

        <div className="px-8 pb-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
              Register
            </a>
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Demo:{' '}
            <span className="font-mono font-semibold">emilys</span> /{' '}
            <span className="font-mono font-semibold">emilyspass</span>
          </p>
        </div>
      </div>
    </div>
  );
};
