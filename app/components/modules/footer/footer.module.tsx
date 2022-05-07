import { StyledContainer, StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'

import Link from 'next/link'
import React from 'react'
import { StyledHr } from '@styled-components/styled-components/styled-micro-components'

type Props = {}

const FooterModule = (props: Props) => {
  return (
    <StyledContainer width="100%" >
        <StyledFlex marginBottom="20px">
            <StyledHr/>
        </StyledFlex>

        <StyledFlex marginBottom="20px">
            Spotify
        </StyledFlex>

        <StyledFlex >
          <StyledFColumn >
              <Link href="home">Home</Link>
              <Link href="about">About</Link>
              <Link href="contact" >Contact</Link>
              <Link href="newsletter">Newsletter</Link>
          </StyledFColumn>

          <StyledFColumn>
              <a href="https://twitter.com/nasirmovlamov" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://github.com/nasirmovlamov"  target="_blank" rel="noreferrer" >Github</a>
              <a href="https://www.youtube.com/channel/UCmE8Psks_-SDw9iG1nn6MpQ" target="_blank" rel="noreferrer" >Youtube</a>
          </StyledFColumn>

          <StyledFColumn>
              <Link href="uses">Uses</Link>
              <Link href="guestbook">Guestbook</Link>
              <Link href="snippets">Snippets</Link>
              <Link href="tweets">Tweets</Link>
          </StyledFColumn>


        </StyledFlex>
    </StyledContainer>
  )
}

export default FooterModule
