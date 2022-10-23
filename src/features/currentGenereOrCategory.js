import { createSlice } from '@reduxjs/toolkit';

export const generOrCategory = createSlice({
  name: 'genereOrCategory',
  initialState: {
    genereIdOrCatagoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genereIdOrCatagoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory,searchMovie } = generOrCategory.actions;

export default generOrCategory.reducer;
