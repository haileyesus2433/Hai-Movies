import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    // https://api.themoviedb.org/3/authentication/token/new?api_key=<<api_key>>
    const { data } = await moviesApi.get('/authentication/token/new');
    const token = data.request_token;
    console.log(data);
    if (data.success) {
      localStorage.setItem('token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSessionId = async () => {
  const token = localStorage.getItem('token');
  try {
    if (token) {
      const { data: { session_id } } = await moviesApi.post('/authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('sessionId', session_id);
      console.log(session_id);
      return session_id;
    }
  } catch (error) {
    console.log(error);
  }
};
