import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useStyles from './style';
import { searchMovie } from '../../features/currentGenereOrCategory';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const keyPressHandler = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(searchQuery));
      setSearchQuery('');
    }
  };
  return (
    <div className={classes.searchContainer}>
      <TextField
        variant="standard"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        onKeyPress={keyPressHandler}
        InputProps={{
          className: classes.input,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
