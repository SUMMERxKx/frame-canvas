import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export function createClientServer() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  // Create Supabase client with auth header if present
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )

  // If auth header is present, set it on the client
  if (authHeader) {
    supabase.auth.setSession({
      access_token: authHeader.replace('Bearer ', ''),
      refresh_token: '',
    }).catch(() => {
      // Ignore errors if token is invalid
    })
  }

  return supabase
}

