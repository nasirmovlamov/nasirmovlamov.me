import axios from 'axios';

export const getUserToken = async () => {
  try {
    const authFetch = await axios.get('https://spotify-token-provider.onrender.com');
    console.log(authFetch.data.token);
    return authFetch.data.token;
  } catch (error) {
    console.log(error);
  }
  return 'test';
};
