"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If no session exists AND we aren't already on the login page, redirect
      // This "window.location.pathname" check is what breaks the infinite loop
      if (!session && window.location.pathname !== "/login") {
        window.location.href = "/login";
        return;
      }

      // If there is a session or we are on the login page, stop loading
      setLoading(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      setLoading(false);
    }
  }

  // Prevent a "flash" of protected content while checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-sm font-medium text-gray-500">Loading TOTS OS...</div>
      </div>
    );
  }

  return <>{children}</>;
}