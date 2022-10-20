import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5% 0',
  },
  image: {
    width: '80%',
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  genreImages: {
    filter: theme.palette.mode === 'light' ? 'dark' : 'invert(1)',
  },
}));
