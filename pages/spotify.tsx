import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledSideParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'
import { useEffect, useState } from 'react'

import { AboutMe } from '@components/modules/aboutme/aboutme.module'
import { DashboardCard } from '@components/modules/dashboard-card/dashboard-card'
import type { NextPage } from 'next'
import { Post1 } from '@components/shared/posts/Post1'
import { Post2 } from '@components/shared/posts/Post2'
import { Post3 } from '@components/shared/posts/Post3'
import { SpotifyPost } from '@components/shared/posts/SpotifyPost'
import axios from 'axios'

const Spotify: NextPage = () => {
  const [spotifyData , setSpotifyData] = useState<any>({items:[]})
  const [loading , setLoading] = useState<"idle" | "pending" | "error">("pending")

  const getSpotifyData:any = async () => {
    try {
      setLoading('pending')
      const request = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: {
          'Authorization': 'Bearer ' + 'BQB-mrQa2CuuS16vqw3RMpvs4R_a5C9g82_l6F8e1IYfibwEqeTwxEFwWCuFUQmxKqAyoXrrd7q71ie3XGzGn7ph38_jJ9mOZJaMxyY4dQQCOujlT4nzGmbexOdvnqGIMaKdFocL1RLEd9U1op6TMXtDhLpJJJk0LU1EiMuZHwiDGQ',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log(request.data)
      setSpotifyData(request.data)
      setLoading('idle')
      return request.data
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getSpotifyData()
  }, [])


  return (
    <>
      <StyledFColumn>
          <StyledHeader>Spotify 🎶</StyledHeader>
          <StyledSideParagraph>
            Recently played spotify songs.
          </StyledSideParagraph>

          <StyledFlex marginTop="30px" flexWrap columnGap="20px" rowGap="20px">
            {
              loading === "pending" ?
              "Loading..."
              :
              (
                spotifyData.items.map((element:any) => {
                  return <SpotifyPost playedAt={element.played_at} externalUrl={element.track.external_urls} url={element.track.album.images[0].url} artist={element.track.artists[0].name} name={element.track.name} />
                })
              )
            }
          </StyledFlex>
      </StyledFColumn>
    </>
  )
}

export default Spotify
