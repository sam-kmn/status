import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {SessionProvider} from 'next-auth/react'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (<>
    <Head>
      <title>No Name</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SessionProvider session={session}>
      <div className='w-screen h-screen flex flex-col overflow-auto bg-blue-50 text-black'>
        <Navbar />  
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  </>)
}

export default MyApp
