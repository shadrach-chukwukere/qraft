import type { NextConfig } from 'next'

const publicEnvironment = {
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID,
}

const nextConfig: NextConfig = {
  // Keep existing Vite hosting variables working during the framework migration.
  env: Object.fromEntries(
    Object.entries(publicEnvironment).filter(([, value]) => Boolean(value)),
  ),
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
