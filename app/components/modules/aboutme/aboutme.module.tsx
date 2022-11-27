import {
  StyledHeader,
  StyledSideParagraph,
  StyledSubHeader,
} from '@styled-components/styled-components/styled-micro-components';

import Image from 'next/image';
import nasirmovlamov2 from '../../../styles/media/images/nasirmovlamov2.jpeg';
import { StyledPersonImage } from './aboutme.styled';

type Props = {};

export const AboutMe = (props: Props) => {
  return (
    <div className="flex flex-wrap  max-w-270 gap-5 justify-center sm:justify-between">
      <div className="flex flex-col flex-wrap max-w-lg md:order-1 order-2 ">
        <h1 className="mb-1 text-black dark:text-white text-5xl">Nasir Movlamov</h1>
        <h2 className="mb-2 text-black dark:text-white text-xl">
          Software Engineer at{' '}
          <a
            target={'_blank'}
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/the-bank-abb/mycompany/"
          >
            ABB
          </a>
        </h2>

        <p className="text-black dark:text-white">
          Physics and Martial arts{'  '} enthusiast. <br />
          learning / talking about javascript, typescript, linux, react, physics
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
