import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import botReducer from './botSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    bot: botReducer,
    user: userReducer,
  },
});
