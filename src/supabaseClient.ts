import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

let client: SupabaseClient<Database> | undefined;

export function getSupabaseClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables. '
      + 'Add your Supabase credentials to .env.local.'
    );
  }

  client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      detectSessionInUrl: true,
    },
  });

  return client;
}

export type { Database, QrCode, QrCodeConfig } from './types/database';
