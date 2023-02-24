import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import type { User } from '../types/user'
import Navbartwo from '@/components/navbar'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session | null }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()
  const { asPath } = router
  const noNavbar = ['/sign-in']
  const testobj: User = { email: 'Frede', id: '123' }

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider>
      {noNavbar.includes(asPath) ? null : <Navbartwo userobj={testobj} />}
      <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  )
}
