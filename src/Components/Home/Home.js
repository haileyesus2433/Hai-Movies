import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../Services/TMDB';
import { MovieList, Pagination, FeaturedMovie } from '..';

const Home = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 17 : 19;
  const [page, setPage] = useState(1);
  const { genereIdOrCatagoryName, searchQuery } = useSelector((state) => state.currentGenereOrCategory);
  const { data, isError, isFetching } = useGetMoviesQuery({ genereIdOrCatagoryName, page, searchQuery });
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
    <>
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </>
  );
};

export default Home;
