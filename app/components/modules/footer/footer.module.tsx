import { getAccessToken } from '@helpers/api/spotify';
import { getUserToken } from '@helpers/api/spotifyAuth';
import { StyledHr, SytledText } from '@styled-components/styled-components/styled-micro-components';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SVG_spotify } from '../../../styles/media/icons/svg-spotify';
import { StyledFooterLink } from './footer.style';

type Props = {};

const FooterModule = (props: Props) => {
  const [loading, setLoading] = useState<'idle' | 'pending' | 'error'>('pending');
  const [spotifyData, setSpotifyData] = useState<any>({});
  const { t } = useTranslation();
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
    <div className="flex flex-col w-full  my-10 max-w-2xl px-3">
      <StyledHr />
      <div className="w-full">
        {loading === 'pending' ? (
          <div className="flex gap-2">
            <SVG_spotify /> <span> {t('loading')}</span>
          </div>
        ) : spotifyData ? (
          spotifyData.is_playing ? (
            <div className="mb-2">
              <a href={spotifyData.item.external_urls.spotify} rel="noreferrer" target="_blank">
                <small className="text-xs"> {t('playing')} </small>
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
              <small className="text-xs"> {t('spotifyPaused')}</small>
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
          <div className="mb-4">
            {t('currentlyNotListening')},{' '}
            <Link href="/spotify" passHref>
              <span className="text-base cursor-pointer">{t('goLatests')}</span>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-36 ">
        <div>
          <Link href="/spotify" passHref>
            <StyledFooterLink>
              <div className="flex gap-2">
                <SVG_spotify /> {t('recentlyPlayed')}
              </div>
            </StyledFooterLink>
          </Link>

          <Link href="/" passHref>
            <StyledFooterLink>{t('home')}</StyledFooterLink>
          </Link>

          <Link href="about" passHref>
            <StyledFooterLink>{t('about')}</StyledFooterLink>
          </Link>

          <Link href="/blog" passHref>
            <StyledFooterLink>{t('blog')}</StyledFooterLink>
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
