# Qraft

Qraft is a QR code design studio built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

1. Install dependencies with `npm install`.
2. Add the public Supabase settings to `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   ```

   The Google client ID is optional. Supabase settings are needed for sign-in and account features.
3. Start the development server with `npm run dev` and open `http://localhost:3000`.

Use `npm run build` to create a production build and `npm start` to serve it locally.
