import { createSlice } from '@reduxjs/toolkit';
import cards from '../cards.json';

const initBotCards = cards.map((theCard) => theCard.value);

export const botSlice = createSlice({
  name: 'bot',
  initialState: {
    botCards: initBotCards,
    botCardAsText: '',
    botAnswer: 0,
  },
  reducers: {
    setBotCards(state, { payload }) {
      state.botCards = payload;
    },
    setBotCardAsText(state, { payload }) {
      state.botCardAsText = payload;
    },
    setBotAnswer(state, { payload }) {
      state.botAnswer = payload;
    },
    resetBotAnswer(state) {
      state.botAnswer = 0;
    },
    resetBotCards(state) {
      return { ...state, botCards: initBotCards };
    },
  },
});

export const {
  setBotCards,
  setBotCardAsText,
  setBotAnswer,
  resetBotCards,
} = botSlice.actions;

export default botSlice.reducer;
