import React, { useEffect, useState } from 'react'
import { StyledContainer, StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledHr, StyledSideParagraph, SytledText } from '@styled-components/styled-components/styled-micro-components'

import Image from 'next/image'
import Link from 'next/link'
import { SVG_spotify } from "../../../styles/media/icons/svg-spotify"
import { StyledFooterLink } from './footer.style'
import axios from 'axios'

type Props = {}

const FooterModule = (props: Props) => {
  const [loading , setLoading] = useState<"idle" | "pending" | "error">("pending")
  const [spotifyData, setSpotifyData] = useState<any>({})

  const getSpotifyData:any = async () => {
      try {
        setLoading('pending')
        const request = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': 'Bearer ' + 'BQCxE9u1Pnd5sPxNmf3H7PbV-kmLlgH-KOhTJlnyDN3xg74njheS68RtK88UE4YPmeBDMzjfmwuQGDm79UaGo_FCUUZIizGcahXV6WpC_cz5N-FIEyBI_rHclqTUM33B40l6ikwrh2adb2NBGd_HRUeAmF00iWLQsLrDznLGyno',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        console.log(request.data)
        setSpotifyData(request.data)
        setLoading('idle')
        return request.data
        console.log(request)
        return request.data
      } catch (error) {
        console.log(error)
      }
  }


  useEffect(()=>{
    getSpotifyData()
  }, [])

  useEffect(()=>{
    setInterval(
      getSpotifyData,
      10000
    )
  }, [])


  return (
    <StyledContainer width="100%" marginTop="50px">
      <StyledFlex marginBottom="20px">
        <StyledHr />
      </StyledFlex>

      <StyledFlex marginBottom="20px" columnGap="10px">
          {
            loading === "pending" ?
            "Loading..."
            :
            (
              spotifyData.is_playing ?
              <a href={spotifyData.item.external_urls.spotify} rel="noreferrer" target="_blank">
                <div style={{display:"flex",alignItems:"center",gap:'8px'}}>
                  <img style={{borderRadius:"50%"}} width={30} layout='fill' src={spotifyData.item.album.images[0].url} alt="Spotify Music" /><SytledText > {spotifyData.item.album.artists[0].name} </SytledText> - <SytledText bold white_2>{spotifyData.item.name}</SytledText>
                </div>
              </a>
              :
              <>
                <SVG_spotify /> <SytledText bold white_2>Not Playing</SytledText>  - <SytledText gray_2> Spotify </SytledText>
              </>
            )
          }

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

          <Link href="/physics" passHref>
            <StyledFooterLink>
              Physics Blog
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
          <a  href="https://twitter.com/nasirmovlamov"  target="_blank" rel="noreferrer">
            <StyledFooterLink>
              Twitter
            </StyledFooterLink>
          </a>

          <a  href="https://github.com/nasirmovlamov"  target={"_blank"} rel="noreferrer">
            <StyledFooterLink>
                Github
            </StyledFooterLink>
          </a>

          <a href="https://www.youtube.com/channel/UCmE8Psks_-SDw9iG1nn6MpQ"  target={"_blank"} rel="noreferrer">
            <StyledFooterLink>
                Youtube
            </StyledFooterLink>
          </a>

        </StyledFColumn>

        <StyledFColumn width="260px">
          {/* <a href="https://leerob.io/" >
            <StyledFooterLink>
            </StyledFooterLink>
          </a> */}
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
