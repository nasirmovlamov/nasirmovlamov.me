import {
  StyledHeader,
  StyledParagraph,
  StyledSubHeader,
} from '@styled-components/styled-components/styled-micro-components';

import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div className="flex flex-wrap justify-between max-w-270 gap-5">
      <StyledHeader> About Me</StyledHeader>
      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        Links
      </StyledSubHeader>
      <ul style={{ listStyle: 'none' }}>
        <li>
          Twitter : <a href="https://twitter.com/nasirmovlamov"> @nasirmovlamov</a>
        </li>
        <li>
          Github : <a href="https://github.com/nasirmovlamov"> @nasirmovlamov</a>
        </li>
        <li>
          Website : <a href="https://nasirmovlamov.me">https://nasirmovlamov.me</a>
        </li>
        <li>
          LinkedIn : <a href="https://linkedin.com/nasirmovlamov"> @nasirmovlamov</a>
        </li>
      </ul>

      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        Job title
      </StyledSubHeader>

      <StyledParagraph>Nasir Movlamov, Software Engineer at ABB</StyledParagraph>

      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        Education
      </StyledSubHeader>

      <StyledParagraph>
        I have graduated from ASOIU with a BS in Computer Engineering. I am studying a MS in
        Artificial Intelligence at ASOIU
      </StyledParagraph>

      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        Research
      </StyledSubHeader>

      <StyledParagraph>
        Data encryption and vulnerability analysis at software infrastructures
      </StyledParagraph>
    </div>
  );
};

export default About;
