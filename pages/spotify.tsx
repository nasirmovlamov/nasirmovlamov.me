import {
  StyledHeader,
  StyledSideParagraph,
} from '@styled-components/styled-components/styled-micro-components';
import { useEffect, useState } from 'react';

import { SpotifyPost } from '@components/shared/posts/SpotifyPost';
import { getUserToken } from '@helpers/api/spotifyAuth';
import axios from 'axios';
import type { NextPage } from 'next';
import { getAccessToken } from '@helpers/api/spotify';
import { useTranslation } from 'react-i18next';

const Spotify: NextPage = () => {
  const [spotifyData, setSpotifyData] = useState<any>({ items: [] });
  const [loading, setLoading] = useState<'idle' | 'pending' | 'error'>('pending');
  const { t } = useTranslation();
  const getSpotifyData: any = async (token: string) => {
    try {
      setLoading('pending');
      const {
        data: { access_token: token },
      } = await getAccessToken();
      const request = await axios.get(
        'https://api.spotify.com/v1/me/player/recently-played?limit=10',
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
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
      <div className="flex flex-col flex-wrap max-w-2xl">
        <StyledHeader>Spotify 🎶</StyledHeader>
        <StyledSideParagraph>{t('recentlyPlayedSpotifySongs')}</StyledSideParagraph>

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
