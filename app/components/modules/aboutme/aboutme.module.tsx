import {
  StyledHeader,
  StyledSideParagraph,
  StyledSubHeader,
} from '@styled-components/styled-components/styled-micro-components';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import nasirmovlamov2 from '../../../styles/media/images/nasirmovlamov2.jpeg';
import { StyledPersonImage } from './aboutme.styled';
import { useEffect } from 'react';

type Props = {};

export const AboutMe = (props: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log(t);
  }, [t]);

  return (
    <div className="flex flex-wrap  max-w-270 gap-5 justify-center sm:justify-between">
      <div className="flex flex-col flex-wrap max-w-lg md:order-1 order-2 ">
        <h1 className="mb-1 text-black dark:text-white text-5xl">{t('myName')}</h1>
        <p className="text-black dark:text-white">
          {t('myEnthusiasm')} <br />
          {t('hobby')} <br />
          <br />
        </p>
      </div>

      <div className="flex md:order-2 order-1">
        <StyledPersonImage>
          <Image src={nasirmovlamov2} alt="image of Nasir Movlamov" />
        </StyledPersonImage>
      </div>
    </div>
  );
};
