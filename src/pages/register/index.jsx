import { RegisterForm } from '@/features/auth';

export const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-indigo-600 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-sm text-indigo-200">Fill in the details below</p>
        </div>

        <div className="px-8 py-6">
          <RegisterForm />
        </div>

        <div className="px-8 pb-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
