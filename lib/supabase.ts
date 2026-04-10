import { createClient } from "@supabase/supabase-js";

// We use fallback empty strings "" to prevent the app from crashing 
// if the environment variables aren't immediately available.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// If you want to be extra safe and see a clear error in the console
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);