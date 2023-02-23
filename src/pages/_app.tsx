import NavBar from '@/Components/NavBar'
import '@/styles/signin.css'
import '@/styles/navbar.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { supabase } from 'supabase'
import { useEffect, useState } from 'react'
import { createBrowserSupabaseClient, } from '@supabase/auth-helpers-nextjs'
// import { supabase } from 'supabase'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {

  // supabase.auth.onAuthStateChange((event, session) => {
  //   fetch("/api/auth", {
  //     method: "POST",
  //     headers: new Headers({ "Content-Type": "application/json" }),
  //     credentials: "same-origin",
  //     body: JSON.stringify({ event, session }),
  //   });

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NavBar />
      <Component {...pageProps} />
    </SessionContextProvider>
  )

}
