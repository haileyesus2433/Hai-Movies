import React from 'react';
import { Divider, List, ListItem, ListItemIcon, Box, ListItemText, ListSubheader, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import logo from '../../Assets/hai-movies-no-background.svg';

const dummyCatagories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Horror', value: 'horror' },
  { label: 'Action', value: 'action' },
  { label: 'Animation', value: 'animation' },
  { label: 'Romance', value: 'romance' },
];

const catagories = [
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

const SideBar = () => {
//   const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={logo}
          alt="Hai-Movies Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {catagories.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem button onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={logo} alt="" height={30} className={classes.genreImages} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {dummyCatagories.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem key={value} button onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={logo} alt="" height={30} className={classes.genreImages} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default SideBar;
