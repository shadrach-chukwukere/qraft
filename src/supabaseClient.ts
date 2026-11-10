import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables. '
    + 'Create a .env file based on .env.example and add your Supabase credentials.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type { Database, QrCode, QrCodeConfig } from './types/database';
