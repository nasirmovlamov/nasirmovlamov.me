import '@css/css-export.css';
import '@scss/scss-export.scss';

import { Layout } from '@components/layout/layout';
import { MobileMenu } from '@components/modules/aboutme/MobileMenu';
import FooterModule from '@components/modules/footer/footer.module';
import { HeaderModule } from '@components/modules/header/header.module';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <MobileMenu />
      <HeaderModule />
      <Component {...pageProps} />
      <FooterModule />
    </Layout>
  );
}

export default MyApp;
