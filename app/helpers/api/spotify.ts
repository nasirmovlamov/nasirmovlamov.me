const client_id = '55a3676e8327405db7edde8b0970749e';
const client_secret = '40701a0bab784b11b6e42e6d8801b8b6';
const refresh_token =
  'AQCxz0Qpb_Jb2FhRP25XDKEkq2DBDK8g-ARdu6T04sDLQS2-aE2VT1ilQxslUMItEUcyVdzYezaepzWMJVnMM56vfv26S4uKt95XZbK-neif8lc2axwhJAZmKQa7CBEp9PyGqhFIxIhYdqKzJF3TRifR882YaXAdczPUFlL_s4vv6UnavVk-NMO68uhuh0ILMW0LShq0Y4dzYeyaCU1kOE_gXUp8L8niEFuCtFB2MheAg7T5X29HUGtN06VcMpzhcHn2miCB2vgpdMBrAU1AXbi07s0WgINjuFovaJ3IybWKhLiZfEVOCDcev5nNGEeiRk-2YxJiyrmuhE7nJnHwV7aw-8Sm_V4b4CYbd0xQzTKii7iItm8B9H6yMVIFQ79bxMZOcOcHVvjFdGuzUnPtBNY9UPJ30vVYFJ4hli_8oCZvVmqZ8_jo0_Q0SvsNGjuRfFhdlIBJJ1c6QvJsHtIngsBj-rKMXDk76sNGws0IPuXU_S9Tmq3Ro-RxV716C7uQp3y_aiv6xk7PpmRQo03Mj9H9ySGrgwNbeQaNPi8xaiY7dAO5QJV74FWEAihzu05MHMq2oPjha_JSlasJQ7T8TCYAQGtaDsXcNDUmMPb__F9dip4zmZl5BQJqKcoNY-TXx1oKmZAS2KhitF0XYu2zQZ3jFYju7TUJdRQIgCAyQ_hBYPWBXS6AwlRjSNaRT-d2e9mvVTAtOIvS8Q9mPCxB1ytzrHOWq0_3yrdxvtkr9VcP3L5M';

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
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
