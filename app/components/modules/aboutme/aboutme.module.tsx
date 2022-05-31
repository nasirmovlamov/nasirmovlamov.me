import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledSideParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'

import Image from 'next/image'
import React from 'react'
import { StyledPersonImage } from './aboutme.styled'
import nasirmovlamov from '../../../styles/media/images/nasirmovlamov.jpeg'

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
              <em>Physics</em>  and <em> Martial arts</em>  enthusiast. <br/>
              Learning/Teaching about javascript, typescript, linux and React / Next.js.<br/>


            </StyledSideParagraph>
        </StyledFColumn>

        <StyledFColumn  width="100px">
            <StyledPersonImage>
              <Image src={nasirmovlamov} alt="image of Nasir Movlamov"/>
            </StyledPersonImage>
        </StyledFColumn>
    </StyledFlex>
  )
}

