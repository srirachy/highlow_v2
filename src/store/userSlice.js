import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userGuess: 0,
    userCardAsText: '',
  },
  reducers: {
    setUserGuess(state, { payload }) {
      state.userGuess = payload;
    },
    resetUserGuess(state) {
      state.userGuess = 0;
    },
    setUserCardAsText(state, { payload }) {
      state.userCardAsText = payload;
    },
  },
});

export const { setUserGuess, setUserCardAsText } = userSlice.actions;

export default userSlice.reducer;
