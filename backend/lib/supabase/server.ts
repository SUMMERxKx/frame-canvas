import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export function createClientServer() {
  const cookieStore = cookies()

  // For Next.js App Router, we use the standard createClient with cookie handling
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: {
          getItem: (key: string) => cookieStore.get(key)?.value,
          setItem: (key: string, value: string) => {
            try {
              cookieStore.set(key, value)
            } catch {
              // Ignore - may be in Server Component
            }
          },
          removeItem: (key: string) => {
            try {
              cookieStore.delete(key)
            } catch {
              // Ignore - may be in Server Component
            }
          },
        },
      },
    }
  )
}

