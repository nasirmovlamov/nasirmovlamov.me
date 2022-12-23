import { AboutMe } from '@components/modules/aboutme/aboutme.module';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log('hello');
  }, [t]);
  return <AboutMe />;
};

export default Home;
