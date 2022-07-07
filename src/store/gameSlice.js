import { createSlice } from '@reduxjs/toolkit';
import cards from '../cards.json';
import headertext from '../headertext.json';
import gametext from '../gametext.json';

const initialCardState = cards;
const allHeaderText = headertext.map((theText) => theText.text);
const allGameText = gametext.map((theText) => theText.text);
const initGuessRemain = 3;
const initVal = 0;
const initGameVals = {
  gameStyle: initVal,
  prevGameStyle: initVal,
  curMax: initVal,
  curMin: initVal,
  headerText: allHeaderText[initVal],
  gameText: allGameText[initVal],
  firstDeal: true,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    guessRemain: initGuessRemain,
    cardState: initialCardState,
    ...initGameVals,
  },
  reducers: {
    setGameStyle(state, { payload }) {
      state.gameStyle = payload;
    },
    setPrevGameStyle(state, { payload }) {
      state.prevGameStyle = payload;
    },
    resetGuess(state) {
      return { ...state, guessRemain: initGuessRemain };
    },
    resetGameVal(state) {
      return {
        ...state,
        ...initGameVals,
      };
    },
    decGuessRemain(state) {
      state.guessRemain -= 1;
    },
    setCardState(state, { payload }) {
      state.cardState = payload;
    },
    resetCardState(state) {
      return { ...state, cardState: initialCardState };
    },
    setCurMax(state, { payload }) {
      state.curMax = payload;
    },
    setCurMin(state, { payload }) {
      state.curMin = payload;
    },
    setHeaderText(state, { payload }) {
      state.headerText = allHeaderText[payload];
    },
    setGameText(state, { payload }) {
      if (Number.isInteger(payload)) {
        state.gameText = allGameText[payload];
      } else {
        state.gameText = payload;
      }
    },
    toggleFirstDeal(state) {
      state.firstDeal = state.firstDeal !== true;
    },
  },
});

export const {
  setGameStyle,
  setPrevGameStyle,
  resetGuess,
  resetGameVal,
  decGuessRemain,
  setCardState,
  resetCardState,
  setCurMax,
  setCurMin,
  setHeaderText,
  setGameText,
  toggleFirstDeal,
} = gameSlice.actions;

export default gameSlice.reducer;
