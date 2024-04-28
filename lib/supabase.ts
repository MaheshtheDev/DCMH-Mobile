import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ytgyxukoilykbkzfhgnj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3l4dWtvaWx5a2JremZoZ25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNjU3NjcsImV4cCI6MjAyOTg0MTc2N30.YdaMSormfmX6TdG4at5GfYWSPi5HUBmmm5KC2hJD4Pg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
