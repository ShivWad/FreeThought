import NavBar from '@/Components/NavBar'
import '@/styles/signin.css'
import '@/styles/navbar.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )

}
