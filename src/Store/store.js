import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../Services/TMDB';
import genereOrCategory from '../features/currentGenereOrCategory';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenereOrCategory: genereOrCategory,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
