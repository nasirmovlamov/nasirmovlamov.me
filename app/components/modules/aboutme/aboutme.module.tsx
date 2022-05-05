import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'

import React from 'react'

type Props = {}

export const AboutMe = (props: Props) => {
  return (
    <StyledFlex spaceBetween>
        <StyledFColumn>
            <h1>About Me</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </StyledFColumn>

        <StyledFColumn>
            <h1>About Me</h1>
        </StyledFColumn>
    </StyledFlex>
  )
}

