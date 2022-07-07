import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from 'styled-components';
import { setUserGuess } from '../store/userSlice';
import {
  setBotAnswer,
  setBotCards,
  resetBotCards,
} from '../store/botSlice';
import {
  setCardState,
  setGameText,
  decGuessRemain,
  setHeaderText,
  setGameStyle,
  setPrevGameStyle,
  resetGuess,
  resetCardState,
  resetGameVal,
  toggleFirstDeal,
} from '../store/gameSlice';
import RenderButtons from './RenderButtons';

const ButtonSection = styles.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
  min-height: 40vh;
  margin-top: 70px;
  
  button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 120px;
    border-radius: 10px;
    margin: 5px;
    margin-top: 80px;
    color: #091c18;
  }

  .cardButton {
    height: 90px;
    width: 65px;
    margin: 3px;
    img {
        height: 80px;
    }
  }

  @media only screen and (min-width: 600px){
      .buttonSection{
          margin-top: 10px;
      }
      button{
          margin-top: 10px;
      }
  }

  @media only screen and (min-width: 992px){
      .buttonSection{
          width: 50%;
          margin-left: 24.8%;
          margin-top: 70px;
      }
      button{
          margin-top: 50px;
      }
      .cardButton{
          height: 140px;
          width: 100px;
          img{
              height: 130px;
          }
      }
  }

  @media only screen and (min-width: 1200px){
      button{
          margin-top: 80px;
      }
  }

  @media only screen and (min-width: 1400px){
      button{
          margin-top: 140px;
      }
      .cardButton{
          height: 190px;
          width: 140px;
          img{
              height: 180px;
          }
      }
  }
`;

function HighLow() {
  const dispatch = useDispatch();
  const { cardState, guessRemain, prevGameStyle, firstDeal } =
    useSelector((state) => state.game, shallowEqual);
  const { botAnswer, botCards } = useSelector(
    (state) => state.bot,
    shallowEqual,
  );
  const { userGuess } = useSelector((state) => state.user);

  // set card as disabled so user cannot guess same card twice
  const setDisabled = (cardVal) => {
    // create a map that will store a new array with the card disabled
    const updatedCardState = cardState.map((theCard) => {
      if (theCard.name === cardVal) {
        // wrap return in bracket to return more than one item maybe... worth trying/testing for img opacity
        return { ...theCard, disabled: true };
      }
      return theCard;
    });
    // set the card state to the new array
    dispatch(setCardState(updatedCardState));
  };

  // remove cards that are greater than what the bot chose
  const filterGreater = () => {
    const updatedBotCards = botCards.filter((theNum) => {
      return theNum < botAnswer;
    });
    dispatch(setBotCards(updatedBotCards)); // could return the state from function then update in main
  };

  // remove cards that are less than what the bot chose
  const filterLesser = () => {
    const updatedBotCards = botCards.filter((theNum) => {
      return theNum > botAnswer;
    });
    dispatch(setBotCards(updatedBotCards));
  };

  // remove all cards except correct answer, mostly to trigger useEffects minmax into botanswer
  const filterAll = () => {
    const updatedBotCards = botCards.filter((theNum) => {
      return theNum;
    });
    dispatch(setBotCards(updatedBotCards));
  };

  // moved majority of function content up to a useEffect
  const theBotGuess = () => {
    if (guessRemain === 3) {
      const initCurMax = Math.max(...botCards);
      const initCurMin = Math.min(...botCards);
      if (firstDeal) {
        const initFindRandoAnswer = Math.floor(
          Math.random() * (initCurMax - initCurMin + 1) + initCurMin,
        );
        dispatch(setBotAnswer(initFindRandoAnswer));
      }
      dispatch(setGameText(`Bot's first guess...`));
      dispatch(decGuessRemain());
    } else if (guessRemain > 0) {
      dispatch(decGuessRemain());
    }
  };

  // onclick when user guesses card
  const guessCard = (cardVal, name) => {
    dispatch(setUserGuess(cardVal));
    setDisabled(name);
    // set game text to say if card is higher or lower
    if (cardVal > botAnswer) {
      dispatch(setGameText(3));
    } else {
      dispatch(setGameText(2));
    }

    // decremement guessremain
    if (guessRemain > 0) {
      dispatch(decGuessRemain());
    }
  };

  // onclick from main menu into a chosen game
  const changeGameStyle = (gameVal) => {
    // set//resetters for game transitions
    dispatch(setBotAnswer(0));
    dispatch(setUserGuess(1));
    // 1 = guesser, 2 = dealer
    if (gameVal === 1) {
      const findRando = Math.floor(Math.random() * (14 - 2 + 1) + 2);
      dispatch(setBotAnswer(findRando));
      dispatch(setHeaderText(2));
      dispatch(setGameText(1));
    } else if (gameVal === 2) {
      dispatch(setHeaderText(1));
      dispatch(setGameText(4));
    }
    dispatch(resetGuess());
    dispatch(setGameStyle(gameVal));
    if (gameVal === 1 || gameVal === 2) {
      dispatch(setPrevGameStyle(gameVal)); // mostly for play again button and some oneffect scenarios
    }
  };

  // onclick choose card for bot to guess when you play as dealer
  const setInitialCard = (cardVal) => {
    // set states for this game mode
    dispatch(resetBotCards());
    dispatch(resetGuess());
    dispatch(setGameStyle(3));
    dispatch(setUserGuess(cardVal));
    theBotGuess();
  };

  // onclick to select if bot should guess higher or lower
  const highOrLow = (buttonVal) => {
    // if higher, remove lower else remove higher
    if (botAnswer !== userGuess) {
      // button val 0 = higher, 1 = lower
      if (botAnswer > userGuess) {
        filterGreater();
        // set game text for bot to say if chose higher or lower
        if (buttonVal === 0) {
          dispatch(setGameText(9)); // higher
        } else {
          dispatch(setGameText(7)); // user lied, bot guesses lower
        }
      } else if (userGuess > botAnswer) {
        filterLesser();
        if (buttonVal === 0) {
          dispatch(setGameText(6)); // user lied, bot guesses higher
        } else {
          dispatch(setGameText(8)); // lower
        }
      }
    } else {
      filterAll();
    }
    theBotGuess();
  };

  // onclick post game menu into main menu or to play same game
  const postGameMenu = (buttonVal) => {
    if (buttonVal === 0) {
      if (firstDeal === true || guessRemain === 2) {
        dispatch(toggleFirstDeal()); // fixes a visual bug where two bot answers were occuring and it displays the second guess
      }
      dispatch(resetCardState());
      dispatch(setBotAnswer(0));
      dispatch(setUserGuess(1));
      changeGameStyle(prevGameStyle);
    } else {
      dispatch(resetCardState());
      dispatch(resetGameVal());
    }
  };

  return (
    <ButtonSection>
      <RenderButtons
        guessCard={guessCard}
        changeGameStyle={changeGameStyle}
        setInitialCard={setInitialCard}
        highOrLow={highOrLow}
        postGameMenu={postGameMenu}
      />
    </ButtonSection>
  );
}

export default HighLow;
