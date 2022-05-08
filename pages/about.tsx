import { StyledHeader, StyledParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'

import type { NextPage } from 'next'
import { StyledFColumn } from '@styled-components/styled-components/styled-containers'

const About: NextPage = () => {
  return (
    <StyledFColumn>
      <StyledHeader> About Me</StyledHeader>
      <StyledSubHeader fontSize="1.5rem" marginTop="20px">Links</StyledSubHeader>
      <ul style={{listStyle:"none"}}>
        <li>Twitter : <a href="https://twitter.com/nasirmovlamov"> @nasirmovlamov</a></li>
        <li>Github : <a href="https://github.com/nasirmovlamov"> @nasirmovlamov</a></li>
        <li>Website : <a href="https://nasirmovlamov.me">https://nasirmovlamov.me</a></li>
        <li>LinkedIn : <a href="https://linkedin.com/nasirmovlamov"> @nasirmovlamov</a></li>
      </ul>

      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        Bio
      </StyledSubHeader>


      <StyledSubHeader fontSize="1.3rem" marginTop="10px">
        Job Title
      </StyledSubHeader>

      <StyledParagraph>
        Nasir Movlamov, Software Engineer at A2Z Technologies
      </StyledParagraph>


      <StyledSubHeader fontSize="1.3rem" marginTop="30px">
        Education
      </StyledSubHeader>

      <StyledParagraph>
        Nasir Movlamov  graduated from ASOIU with a BS in Computer Engineering.
      </StyledParagraph>

      <StyledSubHeader fontSize="1.3rem" marginTop="30px">
        Research
      </StyledSubHeader>

      <StyledParagraph>
        Data encryption and vulnerability analysis at software
        infrastructures
      </StyledParagraph>
    </StyledFColumn>
  )
}

export default About
