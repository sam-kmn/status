import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {SessionProvider} from 'next-auth/react'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (<>
    <Head>
      <title>Status</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SessionProvider session={session}>
      <div className='w-screen h-screen flex flex-col items-center bg-neutral-900 text-white'>
        <Navbar />  
        <div className='h-full w-full sm:w-10/12 md:w-8/12 lg:w-6/12 overflow-auto border-pink-300'>
          <Component {...pageProps} />

        </div>
      </div>
    </SessionProvider>
  </>)
}

export default MyApp
