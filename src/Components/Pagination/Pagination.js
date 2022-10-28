import React from 'react';
import { Button, Typography } from '@mui/material';
import useStyles from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();

  const prevHandler = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => (
        prevPage - 1
      ));
    }
  };
  const nextHandler = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => (
        prevPage + 1
      ));
    }
  };

  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button onClick={prevHandler} className={classes.button} variant="contained" color="primary" type="button">Prev</Button>
      <Typography variant="h4" className={classes.pageNumber}>{currentPage}</Typography>
      <Button onClick={nextHandler} className={classes.button} variant="contained" color="primary" type="button">Next</Button>
    </div>
  );
};

export default Pagination;
