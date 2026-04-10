"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr"; // Changed this
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // Create the client directly using your env vars
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Successful login! 
      // We refresh to ensure the middleware picks up the new cookie
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9] px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            TOTS-OS
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back. Please sign in.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-xs text-red-500 border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            <input
              type="email"
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 text-sm focus:border-black focus:ring-0 focus:outline-none transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 text-sm focus:border-black focus:ring-0 focus:outline-none transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 px-4 text-sm font-medium text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign in"}
          </button>
        </form>
        
        <div className="text-center text-xs text-gray-400 mt-6">
          Don't have an account? <a href="/join" className="text-black hover:underline">Request access</a>
        </div>
      </div>
    </div>
  );
}