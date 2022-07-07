import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header';
import Text from '../components/Text';
import HighLow from '../components/HighLow';
import cards from '../cards.json';
import {
  setGameText,
  resetCardState,
  setGameStyle,
  setHeaderText,
  setCurMax,
  setCurMin,
} from '../store/gameSlice';
import { setBotCardAsText, setBotAnswer } from '../store/botSlice';
import { setUserCardAsText } from '../store/userSlice';
import mainBkgd from '../img/card_table.png';

const GameWrapper = styled.article`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-image: url(${mainBkgd});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
`;

const HeaderSection = styled.section`
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  h1 {
    font-size: 2rem;
    font-family: 'Titan One', cursive;
  }

  @media only screen and (min-width: 992px) {
    h1 {
      font-size: 3rem;
    }
  }

  @media only screen and (min-width: 1200px) {
    h1 {
      font-size: 4rem;
    }
  }
`;

const TextSection = styled.section`
  min-height: 10vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 3px;
  margin-top: 10px;
  p {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 600px) {
    margin-top: 30px;
  }

  @media only screen and (min-width: 1200px) {
    margin-top: 0px;
  }
`;

function Main() {
  const dispatch = useDispatch();

  const {
    gameStyle,
    headerText,
    gameText,
    prevGameStyle,
    guessRemain,
    curMax,
    curMin,
  } = useSelector((state) => state.game, shallowEqual);
  const { userCardAsText, userGuess } = useSelector(
    (state) => state.user,
    shallowEqual,
  );
  const { botCardAsText, botAnswer, botCards } = useSelector(
    (state) => state.bot,
    shallowEqual,
  );

  // translates value into a text value "mostly for royals + ace"
  const getCardAsText = (cardVal) => {
    return cards
      .find((theCard) => theCard.value === cardVal)
      .name.toString();
  };

  // useeffect for guesser, win/lose condition
  useEffect(() => {
    if (gameStyle === 1) {
      if (userGuess === botAnswer) {
        dispatch(
          setGameText(
            `Success! Bot's card was indeed: ${botCardAsText}`,
          ),
        );
        dispatch(setGameStyle(4));
        dispatch(setHeaderText(3));
        dispatch(resetCardState());
      } else if (guessRemain === 0) {
        dispatch(
          setGameText(
            `Better luck next time. Bot's card was: ${botCardAsText}`,
          ),
        );
        dispatch(setGameStyle(4));
        dispatch(setHeaderText(4));
        dispatch(resetCardState());
      }
    }
  }, [
    dispatch,
    botAnswer,
    botCardAsText,
    gameStyle,
    guessRemain,
    userGuess,
  ]);

  // useeffect for dealer, win/lose condition
  useEffect(() => {
    if (gameStyle === 3 || (prevGameStyle === 2 && gameStyle === 4)) {
      // using prevgamestyle as another dep array is a little hackish but it works
      if (userGuess === botAnswer) {
        dispatch(setGameStyle(4));
        dispatch(setHeaderText(4));
      } else if (guessRemain === 0) {
        dispatch(setGameStyle(4));
        dispatch(setHeaderText(3));
      }
    }
  }, [
    dispatch,
    botAnswer,
    gameStyle,
    guessRemain,
    prevGameStyle,
    userGuess,
  ]);

  // every time bot answer renders, update setBotCardAsText
  useEffect(() => {
    if (gameStyle === 1) {
      const curAnswer = getCardAsText(botAnswer);
      dispatch(setBotCardAsText(curAnswer));
    }
  }, [dispatch, botAnswer, gameStyle]);

  // useeffect for user guess as text when playing as dealer
  useEffect(() => {
    if (gameStyle === 3) {
      const curAnswer = getCardAsText(userGuess);
      dispatch(setUserCardAsText(curAnswer));
    }
  }, [dispatch, userGuess, gameStyle]);

  // useeffect for curmin & curmax, which is dependent on botCards specifically after filters
  useEffect(() => {
    if (gameStyle !== 4) {
      const findMax = Math.max(...botCards);
      dispatch(setCurMax(findMax));
      const findMin = Math.min(...botCards);
      dispatch(setCurMin(findMin));
    }
  }, [dispatch, botCards, gameStyle]);

  // useEffect to find botAnswer using curMax and curMin
  useEffect(() => {
    const findAnswer = Math.floor(
      Math.random() * (curMax - curMin + 1) + curMin,
    );
    dispatch(setBotAnswer(findAnswer));
  }, [dispatch, curMax, curMin]);

  // every time bot answer renders, update setBotCardAsText
  useEffect(() => {
    if (gameStyle === 3 || (prevGameStyle === 2 && gameStyle === 4)) {
      if (botAnswer) {
        const curAnswer = getCardAsText(botAnswer);
        dispatch(setBotCardAsText(curAnswer));
      }
    }
  }, [dispatch, botAnswer, gameStyle, prevGameStyle]);

  return (
    <GameWrapper>
      <HeaderSection>
        <Header type="h1">{headerText}</Header>
      </HeaderSection>
      <TextSection>
        <Text>{gameText}</Text>
        {(gameStyle === 3 ||
          (prevGameStyle === 2 && gameStyle === 4)) && (
          <Text>
            Bot guess is: {botCardAsText} (Your card: {userCardAsText}
            )
          </Text>
        )}
        {(gameStyle === 1 || gameStyle === 3 || gameStyle === 4) && (
          <Text>Guesses Remaining: {guessRemain}/3</Text>
        )}
      </TextSection>
      <HighLow />
    </GameWrapper>
  );
}

export default Main;
