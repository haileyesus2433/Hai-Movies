import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, CircularProgress, Grid, Box, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, ArrowBack, Remove } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../Services/TMDB';
import genreIcons from '../../Assets/genres/index';
import { selectGenreOrCategory } from '../../features/currentGenereOrCategory';
import { MovieList } from '..';
import { userSelector } from '../../features/auth';
import useStyles from './styles';

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('sessionId'), page: 1 });
  const { data: watchListedMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('sessionId'), page: 1 });

  const { data, isFetching, isError } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ movieId: id, list: 'recommendations' });
  const [modalOpen, setModalOpen] = useState(false);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [data, favoriteMovies]);

  useEffect(() => {
    setIsMovieWatchListed(!!watchListedMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [data, watchListedMovies]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('sessionId')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      },
    );
    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('sessionId')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchListed,
      },
    );
    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="6rem" />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link to="/">
          Something Went Wrong Go Back
        </Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          className={classes.poster}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" gutterBottom align="center">
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          {data?.tagline}
        </Typography>
        <Grid className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" style={{ marginLeft: '10px' }} gutterBottom>{data?.vote_average.toFixed(1)}/10</Typography>
          </Box>
          <Typography>{data.runtime} Min{data?.spoken_languages ? `/ ${data.spoken_languages[0].name}` : ''}</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres.map((genre) => (
            <Link key={genre.id} to="/" className={classes.links} onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} alt="" height={30} className={classes.genreImage} />
              <Typography variant="subtitle1" color="textPrimary">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2em' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && (
            <Grid item key={i} xs={6} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img
                className={classes.castImage}
                src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                alt={character.name}
              />
              <Typography color="textPrimary">{character.name}</Typography>
              <Typography color="textSecondary">{character.character.split('/')[1] ? character.character.split('/')[1] : character.character.split('/')[0]}</Typography>
            </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferer" href={data?.homepage} endIcon={<Language />}>WEBSITE</Button>
                <Button target="_blank" rel="noopener noreferer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => { setModalOpen(true); }} href="#" endIcon={<Theaters />}>TRAILER</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}>
                  {isMovieFavorited ? ' UNFAVORITE' : 'FAVORITE'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}>
                  WATCHLIST
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ color: 'primary.main' }}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle1" style={{ textDecoration: 'none' }}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5em" width="100%">
        <Typography variant="h3" align="center" gutterBottom>You Might Also Like</Typography>
        {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : (
          <Box>
            Sorry Nothing To Show Here
          </Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className={classes.modal}
      >
        {data.videos.results.length > 0 && (
        <iframe
          autoPlay
          className={classes.video}
          title="Trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          frameBorder="0"
          allow="autoplay"
        />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;

