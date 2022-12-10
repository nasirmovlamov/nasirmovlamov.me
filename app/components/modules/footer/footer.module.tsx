import { getAccessToken } from '@helpers/api/spotify';
import { getUserToken } from '@helpers/api/spotifyAuth';
import { StyledHr, SytledText } from '@styled-components/styled-components/styled-micro-components';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SVG_spotify } from '../../../styles/media/icons/svg-spotify';
import { StyledFooterLink } from './footer.style';

type Props = {};

const FooterModule = (props: Props) => {
  const [loading, setLoading] = useState<'idle' | 'pending' | 'error'>('pending');
  const [spotifyData, setSpotifyData] = useState<any>({});

  const getSpotifyData: any = async () => {
    try {
      setLoading('pending');
      const {
        data: { access_token: token },
      } = await getAccessToken();
      const request = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setSpotifyData(request.data);
      setLoading('idle');
      return request.data;
    } catch (error) {
      console.log(error);
      setSpotifyData(null);
    }
  };

  useEffect(() => {
    getSpotifyData();
  }, []);

  useEffect(() => {
    setInterval(getSpotifyData, 10000);
  }, []);

  return (
    <div className="flex flex-col w-full  md:min-w-270 my-10">
      <StyledHr />

      <div className="flex flex-wrap gap-x-36 ">
        <div>
          {loading === 'pending' ? (
            <div className="flex gap-2">
              <SVG_spotify /> <span> Loading...</span>
            </div>
          ) : spotifyData ? (
            spotifyData.is_playing ? (
              <div className="mb-2">
                <a href={spotifyData.item.external_urls.spotify} rel="noreferrer" target="_blank">
                  <small className="text-xs"> Playing </small>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      style={{ borderRadius: '50%' }}
                      width={30}
                      src={spotifyData.item.album.images[0].url}
                      alt="Spotify Music"
                    />
                    <SytledText> {spotifyData.item.album.artists[0].name} </SytledText> -{' '}
                    <SytledText bold white_2>
                      {spotifyData.item.name}
                    </SytledText>
                  </div>
                </a>
              </div>
            ) : (
              <div className="mb-2">
                <small className="text-xs"> Spotify Paused </small>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    style={{ borderRadius: '50%' }}
                    width={30}
                    src={spotifyData.item.album.images[0].url}
                    alt="Spotify Music"
                  />
                  <SytledText> {spotifyData.item.album.artists[0].name} </SytledText> -{' '}
                  <SytledText bold white_2>
                    {spotifyData.item.name}
                  </SytledText>
                </div>
              </div>
            )
          ) : (
            <div className="flex align-middle gap-2 mb-4">
              <SVG_spotify /> Spotify Not Playing
            </div>
          )}

          <Link href="/spotify" passHref>
            <StyledFooterLink>Spotify</StyledFooterLink>
          </Link>

          <Link href="/" passHref>
            <StyledFooterLink>Home</StyledFooterLink>
          </Link>

          <Link href="about" passHref>
            <StyledFooterLink>About</StyledFooterLink>
          </Link>

          <Link href="/blog" passHref>
            <StyledFooterLink>Blog</StyledFooterLink>
          </Link>
        </div>

        <div>
          <a href="https://twitter.com/nasirmovlamov" target="_blank" rel="noreferrer">
            <StyledFooterLink>Twitter</StyledFooterLink>
          </a>

          <a href="https://github.com/nasirmovlamov" target={'_blank'} rel="noreferrer">
            <StyledFooterLink>Github</StyledFooterLink>
          </a>

          <a
            href="https://www.youtube.com/channel/UCmE8Psks_-SDw9iG1nn6MpQ"
            target={'_blank'}
            rel="noreferrer"
          >
            <StyledFooterLink>Youtube</StyledFooterLink>
          </a>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default FooterModule;
