import { StyledContainer, StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledHr, StyledSideParagraph, SytledText } from '@styled-components/styled-components/styled-micro-components'

import Link from 'next/link'
import React from 'react'
import { SVG_spotify } from "../../../styles/media/icons/svg-spotify"
import { StyledFooterLink } from './footer.style'

type Props = {}

const FooterModule = (props: Props) => {
  return (
    <StyledContainer width="100%" marginTop="50px">
      <StyledFlex marginBottom="20px">
        <StyledHr />
      </StyledFlex>

      <StyledFlex marginBottom="20px" columnGap="10px">
        <SVG_spotify /> <SytledText bold white_2>Not Playing</SytledText>  - <SytledText gray_2> Spotify </SytledText>
      </StyledFlex>

      <StyledFlex spaceBetween>
        <StyledFColumn width="260px">
          <Link href="/" passHref>
            <StyledFooterLink>
              Home
            </StyledFooterLink>
          </Link>

          <Link href="about" passHref>
            <StyledFooterLink>
              About
            </StyledFooterLink>
          </Link>

          {/* <Link href="contact" passHref>
            <StyledFooterLink>
              Contact
            </StyledFooterLink>
          </Link> */}
{/*
          <Link href="newsletter" passHref>
            <StyledFooterLink>
              Newsletter
            </StyledFooterLink>
          </Link> */}
        </StyledFColumn>

        <StyledFColumn width="260px">
          <Link href="https://twitter.com/nasirmovlamov"  passHref>
            <StyledFooterLink>
              Twitter
            </StyledFooterLink>
          </Link>
          <Link href="https://github.com/nasirmovlamov"  passHref >
            <StyledFooterLink>
              Github
            </StyledFooterLink>
          </Link>
          <Link href="https://www.youtube.com/channel/UCmE8Psks_-SDw9iG1nn6MpQ"  passHref>
            <StyledFooterLink>
              Youtube
            </StyledFooterLink>
          </Link>
        </StyledFColumn>

        <StyledFColumn width="260px">
          {/* <Link href="uses" passHref>
            <StyledFooterLink>
              Uses
            </StyledFooterLink>
          </Link>

          <Link href="guestbook" passHref>
            <StyledFooterLink>
              Guestbook
            </StyledFooterLink>
          </Link>

          <Link href="snippets" passHref>
            <StyledFooterLink>
              Snippets
            </StyledFooterLink>
          </Link>

          <Link href="tweets" passHref>
            <StyledFooterLink>
              Tweets
            </StyledFooterLink>
          </Link> */}
        </StyledFColumn>


      </StyledFlex>
    </StyledContainer>
  )
}

export default FooterModule
