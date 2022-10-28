import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const favoriteMovies = [];

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
      {!favoriteMovies.length ? (<Typography variant="h5" color="inherit">Add Movies As Favorite To See Them Here.</Typography>) : (
        <Box>
          <Typography>Test</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
