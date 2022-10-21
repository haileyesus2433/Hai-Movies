import React from 'react';
import { Grid, Typography, Tooltip, Rating, Grow } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import tempImage from '../../Assets/Hai-Movies-logos_black.png';

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className={classes.movie}>
      <Grow in timeout={(i + 1) * 250}>
        <Link to={`/movie/${movie.id}`} className={classes.links}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : tempImage}
            alt={movie.title}
            className={classes.image}
          />
          <Typography variant="h5" className={classes.tittle}>{movie.title}</Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average}/10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
