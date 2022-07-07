import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Button from './Button';
import cards from '../cards.json';
import gametypes from '../gametypes.json';
import highlows from '../highlows.json';
import postgames from '../postgames.json';

const RenderButtons = ({
  changeGameStyle,
  guessCard,
  setInitialCard,
  highOrLow,
  postGameMenu,
}) => {
  const { gameStyle, cardState } = useSelector(
    (state) => state.game,
    shallowEqual,
  );
  const buttonElmts = [];

  switch (gameStyle) {
    case 0:
      // initial -- main menu
      gametypes.forEach(({ disabled, value, name }) => {
        buttonElmts.push(
          <Button
            key={nanoid()}
            value={value}
            onClick={() => changeGameStyle(value)}
            disabled={disabled}
          >
            {name}
          </Button>,
        );
      });
      break;
    case 1:
      // play as guesser
      cardState.forEach(
        ({ disabled, value, name, imgName, className }) => {
          buttonElmts.push(
            <Button
              key={nanoid()}
              value={value}
              onClick={() => guessCard(value, name, disabled)}
              disabled={disabled}
              className={className}
            >
              {/* cool trick to get img source */}
              {imgName && (
                <img
                  src={`${process.env.PUBLIC_URL}/images/${imgName}.svg`}
                  alt={name}
                />
              )}
            </Button>,
          );
        },
      );
      break;
    case 2:
      // play as dealer -- choose card for bot to guess
      cards.forEach(
        ({ disabled, value, name, imgName, className }) => {
          buttonElmts.push(
            <Button
              key={nanoid()}
              value={value}
              onClick={() => setInitialCard(value, name)}
              disabled={disabled}
              className={className}
            >
              {imgName && (
                <img
                  src={`${process.env.PUBLIC_URL}/images/${imgName}.svg`}
                  alt={name}
                />
              )}
            </Button>,
          );
        },
      );
      break;
    case 3:
      // play as dealer -- select high/low for bot
      highlows.forEach(({ disabled, value, name }) => {
        buttonElmts.push(
          <Button
            key={nanoid()}
            value={value}
            onClick={() => highOrLow(value)}
            disabled={disabled}
          >
            {name}
          </Button>,
        );
      });
      break;
    default:
      // postgame -- win/lose screen
      postgames.forEach(({ disabled, value, name }) => {
        buttonElmts.push(
          <Button
            key={nanoid()}
            value={value}
            onClick={() => postGameMenu(value)}
            disabled={disabled}
          >
            {name}
          </Button>,
        );
      });
  }
  return buttonElmts;
};

export default RenderButtons;
