import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../Services/TMDB';
import MovieList from '../MovieList/MovieList';

const Home = () => {
  const { data, error, isFetching } = useGetMoviesQuery();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4em" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No Movies By That Name Were Found.
          <br />
          Please Try Searching For Another Movie
        </Typography>
      </Box>
    );
  }

  if (error) return 'An Error Has Occured';

  return (
    <MovieList movies={data} />
  );
};

export default Home;
