import NavBar from '@/Components/NavBar'
import '@/styles/signin.css'
import '@/styles/navbar.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { supabase } from 'supabase'

export default function App({ Component, pageProps }: AppProps) {

  // supabase.auth.onAuthStateChange((event, session) => {
  //   fetch("/api/auth", {
  //     method: "POST",
  //     headers: new Headers({ "Content-Type": "application/json" }),
  //     credentials: "same-origin",
  //     body: JSON.stringify({ event, session }),
  //   });

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )

}
