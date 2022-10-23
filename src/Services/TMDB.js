import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // ? Get Movies By Type

    getMovies: builder.query({

      query: ({ genereIdOrCatagoryName, page, searchQuery }) => {
        //! Get Searched Movies
        if (searchQuery) {
          return `search/movie/?query=${searchQuery}&api_key=${tmdbApiKey}&page=${page}`;
        }

        //! Get Movies By Category

        if (genereIdOrCatagoryName && typeof genereIdOrCatagoryName === 'string') {
          return `movie/${genereIdOrCatagoryName}?api_key=${tmdbApiKey}&page=${page}`;
        }

        //! Get Movies By Generes
        if (genereIdOrCatagoryName && typeof genereIdOrCatagoryName === 'number') {
          // discover/movie?api_key=###&with_genres=28
          return `discover/movie/?with_genres=${genereIdOrCatagoryName}&api_key=${tmdbApiKey}&page=${page}`;
        }

        //! Get Popular Movies
        return `movie/popular?api_key=${tmdbApiKey}&page=${page}`;
      },
    }),

    //! Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
