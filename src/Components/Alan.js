import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { colorModeContext } from '../utils/ChangeMode';
import { fetchToken } from '../utils/fetchToken';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenereOrCategory';

const useAlan = () => {
  const dispatch = useDispatch();
  const { setMode } = useContext(colorModeContext);
  const navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: 'f931e4352664746e6e6417fd81e97a082e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === 'chooseGenre') {
          console.log(command, genreOrCategory, genres);
          const choosedGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
          if (choosedGenre) {
            navigate('/');
            dispatch(selectGenreOrCategory(choosedGenre.id));
            console.log(choosedGenre);
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
            navigate('/');
            console.log(category);
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'logout') {
          localStorage.clear();
          navigate('/');
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
