import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../utils/theme'
import Navbar from '@/components/navbar'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session | null }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
  )
}
