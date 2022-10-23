import React from 'react';
import { Divider, List, ListItem, ListItemIcon, Box, ListItemText, ListSubheader, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { useGetGenresQuery } from '../../Services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenereOrCategory';
import genreIcons from '../../Assets/genres/index';

const catagories = [
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

const SideBar = () => {
//   const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, isFetching } = useGetGenresQuery();
  if (isFetching) {
    return <CircularProgress />;
  }

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          // src={logo}
          alt="Hai-Movies Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Catagories</ListSubheader>
        {catagories.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem key={value} button onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} alt="" height={30} className={classes.genreImages} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (data.genres.map(({ id, name }) => (
          <Link key={id} to="/" className={classes.links}>
            <ListItem button onClick={() => dispatch(selectGenreOrCategory(id))}>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} alt="" height={30} className={classes.genreImages} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        )))}
      </List>
    </>
  );
};

export default SideBar;
