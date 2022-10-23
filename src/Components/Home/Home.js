import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../Services/TMDB';
import MovieList from '../MovieList/MovieList';

const Home = () => {
  const [page, setPage] = useState(1);
  const { genereIdOrCatagoryName,searchQuery} = useSelector((state) => state.currentGenereOrCategory);
  const { data, isError, isFetching } = useGetMoviesQuery({ genereIdOrCatagoryName, page,searchQuery });
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

  if (isError) return 'An Error Has Occured';

  return (
    <MovieList movies={data} />
  );
};

export default Home;
