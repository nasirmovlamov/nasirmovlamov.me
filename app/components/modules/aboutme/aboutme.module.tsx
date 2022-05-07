import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledSideParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'

import React from 'react'

type Props = {}

export const AboutMe = (props: Props) => {
  return (
    <StyledFlex spaceBetween>
        <StyledFColumn>
            <StyledHeader>Nasir Movlamov</StyledHeader>
            <StyledSubHeader>
              Software Engineer at A2Z Technologies
            </StyledSubHeader>
            <StyledSideParagraph>
              Trying to build a faster web and write clean code.   <em>Physics</em>  and <em> Martial arts</em>  enthusiast. Learning/Teaching about data structures, algoritms, and React / Next.js.
            </StyledSideParagraph>
        </StyledFColumn>

        <StyledFColumn  width="100px">
            <h1>About Me</h1>
        </StyledFColumn>
    </StyledFlex>
  )
}

