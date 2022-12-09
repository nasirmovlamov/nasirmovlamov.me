import {
  StyledHeader,
  StyledSideParagraph,
} from '@styled-components/styled-components/styled-micro-components';
import { useEffect, useState } from 'react';

import { SpotifyPost } from '@components/shared/posts/SpotifyPost';
import { getUserToken } from '@helpers/api/spotifyAuth';
import type { NextPage } from 'next';
import { getTopTracks } from '@helpers/api/spotify';

const Spotify: NextPage = () => {
  const [spotifyData, setSpotifyData] = useState<any>({ items: [] });
  const [loading, setLoading] = useState<'idle' | 'pending' | 'error'>('pending');

  const getSpotifyData: any = async (token: string) => {
    try {
      setLoading('pending');
      const token = await getUserToken();
      const request: any = await getTopTracks();
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
