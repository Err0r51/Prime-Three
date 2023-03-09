import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from '@/components/footer'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session | null }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider>
      <Component {...pageProps} />
      <Footer/>
      </ChakraProvider>
    </SessionContextProvider>
  )
}
