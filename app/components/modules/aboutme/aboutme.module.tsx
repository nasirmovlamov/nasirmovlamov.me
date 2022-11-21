import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers';
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
    <div className="flex flex-wrap justify-between max-w-270 gap-5">
      <div className="flex flex-col flex-wrap max-w-lg md:order-1 order-2">
        <StyledHeader>Nasir Movlamov</StyledHeader>
        <StyledSubHeader>
          Software Engineer at{' '}
          <a
            target={'_blank'}
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/the-bank-abb/mycompany/"
          >
            ABB
          </a>
        </StyledSubHeader>
        <StyledSideParagraph>
          <em>Physics</em> and <em> Martial arts</em> {'  '} enthusiast. <br />
          learning / talking about javascript, typescript, linux, react, physics
          <br />
        </StyledSideParagraph>
      </div>

      <div className="flex md:order-2 order-1">
        <StyledPersonImage>
          <Image src={nasirmovlamov2} alt="image of Nasir Movlamov" />
        </StyledPersonImage>
      </div>
    </div>
  );
};
