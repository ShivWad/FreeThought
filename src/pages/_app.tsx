import NavBar from '@/Components/NavBar'
import '@/styles/signin.css'
import '@/styles/navbar.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {supabase} from 'supabase'

// import supabase from 'supabase'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <NavBar />
      <Component {...pageProps} />
    </SessionContextProvider>
  )

}
