import { createClient } from '@supabase/supabase-js';

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const configuredSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  configuredSupabaseUrl && configuredSupabaseAnonKey
);

const supabaseUrl = configuredSupabaseUrl ?? 'https://demo-project.supabase.co';
const supabaseAnonKey = configuredSupabaseAnonKey ?? 'demo-anon-key';

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase env vars are missing. Running in frontend-only mode.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
