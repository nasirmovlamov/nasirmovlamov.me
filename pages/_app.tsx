import '@css/css-export.css'
import '@scss/scss-export.scss'

import type { AppProps } from 'next/app'
import FooterModule from '@components/modules/footer/footer.module'
import { HeaderModule } from '@components/modules/header/header.module'
import { Layout } from '@components/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <HeaderModule/>
      <Component {...pageProps} />
      <FooterModule/>
    </Layout>
  )
}

export default MyApp
