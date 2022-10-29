import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../Services/TMDB';
import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('sessionId'), page: 1 });
  const { data: watchListedMovies, refetch: refetchWatchListed } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('sessionId'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchListed();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" color="inherit">
          My Profile
        </Typography>
        <Button onClick={logout} color="inherit">
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchListedMovies?.results?.length ? (<Typography variant="h5" color="inherit">Add Movies As Favorite To See Them Here.</Typography>) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="WatchList Movies" data={watchListedMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
