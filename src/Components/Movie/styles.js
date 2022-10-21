import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  tittle: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    marginTop: '10px',
    marginBottom: 0,
    overflow: 'hidden',
    width: '230px',
    whiteSpace: 'no wrap',
    textAlign: 'center',
  },
  image: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '15px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginBottom: '15px',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
