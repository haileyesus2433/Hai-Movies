import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../Services/TMDB';

const Home = () => {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return (
    <div>Home</div>
  );
};

export default Home;
