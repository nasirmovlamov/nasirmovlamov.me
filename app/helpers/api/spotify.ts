import axios from 'axios';
const btoa = require('btoa');
const client_id = '55a3676e8327405db7edde8b0970749e';
const client_secret = '40701a0bab784b11b6e42e6d8801b8b6';
const refresh_token =
  'AQDevyzTWkcxOJmUpZhYIK1kt8vZebSLjSGMYHlOOZvu2uTA9gJCIUapFJ86bnOzyGENkEod1zLneJFO8e7Ux4lXLwT7H6dXymqCxo_wJjp1jsPiTnZcmDuOPM2vmNPncfg';

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const response: any = await axios.post(
    TOKEN_ENDPOINT,
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response;
};

export const getNowPlaying = async () => {
  const {
    data: { access_token },
  } = await getAccessToken();
  return axios.get(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
