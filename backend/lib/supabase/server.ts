import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export function createClientServer() {
  const cookieStore = cookies()

  // For Next.js App Router API routes, we need to handle cookies manually
  // Note: This is a simplified version. For production, consider using @supabase/ssr
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false, // We'll handle sessions via cookies manually
        autoRefreshToken: false,
      },
      global: {
        headers: {
          // Forward auth cookies if present
          Authorization: cookieStore.get('sb-access-token')?.value 
            ? `Bearer ${cookieStore.get('sb-access-token')?.value}` 
            : '',
        },
      },
    }
  )
}

