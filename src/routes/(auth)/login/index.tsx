import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({ to: '/ideas' });
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await mutateAsync({ email, password });
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>

      {error && (
        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          className="border-gray w-full rounded-md border p-2"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          className="border-gray w-full rounded-md border p-2"
        />

        <button
          disabled={isPending}
          className="w-full cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Logging In...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
