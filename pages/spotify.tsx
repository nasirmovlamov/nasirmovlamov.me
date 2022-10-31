import {
  StyledHeader,
  StyledSideParagraph,
} from '@styled-components/styled-components/styled-micro-components';
import { useEffect, useState } from 'react';

import { SpotifyPost } from '@components/shared/posts/SpotifyPost';
import axios from 'axios';
import type { NextPage } from 'next';

const Spotify: NextPage = () => {
  const [spotifyData, setSpotifyData] = useState<any>({ items: [] });
  const [loading, setLoading] = useState<'idle' | 'pending' | 'error'>('pending');

  const getSpotifyData: any = async () => {
    try {
      setLoading('pending');
      const request = await axios.get(
        'https://api.spotify.com/v1/me/player/recently-played?limit=10',
        {
          headers: {
            Authorization:
              'Bearer ' +
              'BQASyb_c6N6W2YPdKyFBVXvan9mM-JJF0mBEYK9GM48NQfZiQmUeLR7nLhTQ5E7KieqN0PvoWMRJoIusMdfUbCwGR2YtoW6neAHtcsubdWHL4H8LfU6ojxEmdDg1qNj0jiNDTH-l_IVHeZ0oHxZEGyigDZWp8ZaPsSXeYgl7yQpTpPBviQPHB4ahBP_DdqraxmgPQ2f7',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(request.data);
      setSpotifyData(request.data);
      setLoading('idle');
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpotifyData();
  }, []);

  return (
    <>
      <div className="flex flex-col flex-wrap min-w-270">
        <StyledHeader>Spotify 🎶</StyledHeader>
        <StyledSideParagraph>Recently played spotify songs.</StyledSideParagraph>

        <div className="flex flex-col mt-7 gap-5">
          {loading === 'pending'
            ? 'Loading...'
            : spotifyData.items.map((element: any, index: number) => {
                return (
                  <SpotifyPost
                    key={index}
                    playedAt={element.played_at}
                    externalUrl={element.track.external_urls}
                    url={element.track.album.images[0].url}
                    artist={element.track.artists[0].name}
                    name={element.track.name}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Spotify;
