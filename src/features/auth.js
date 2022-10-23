import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

const userData = createSlice({
  name: 'User Data',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      state.sessionId = localStorage.getItem('sessionId');
      state.isAuthenticated = true;

      localStorage.setItem('accountId', action.payload.id);
    },
  },
});

export const { setUserData } = userData.actions;
export const userSelector = (state) => state.userData;
export default userData.reducer;

