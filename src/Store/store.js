import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../Services/TMDB';
import genereOrCategory from '../features/currentGenereOrCategory';
import userData from '../features/auth';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenereOrCategory: genereOrCategory,
    userData,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
