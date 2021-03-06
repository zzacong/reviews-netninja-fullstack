import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'

import SiteHeader from '../components/site-header/SiteHeader'
import { client } from '../lib/config/apollo'
import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Head>
          <title>Strapi Netninja</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SiteHeader />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
