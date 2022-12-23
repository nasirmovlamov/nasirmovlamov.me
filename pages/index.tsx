import { AboutMe } from '@components/modules/aboutme/aboutme.module';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {
    console.log('hello');
  }, []);
  return <AboutMe />;
};

export default Home;
