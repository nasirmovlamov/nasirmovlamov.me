import '@css/css-export.css'
import '@scss/scss-export.scss'
import "@css/css-export.css"

import type { AppProps } from 'next/app'
import { Header_Module } from '@components/modules/header/header.module'
import { Layout } from '@components/layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header_Module/>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
