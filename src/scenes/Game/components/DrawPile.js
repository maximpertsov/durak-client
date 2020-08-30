import React from 'react';
import { useSelector } from 'react-redux';

import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import Cards from './Cards';

const DrawPile = () => {
  const drawPile = useSelector(state => state.drawPile, isEqual);

  const nextCard = { flipped: true };
  const lastCard = { card: last(drawPile) };
  const displayText = `${size(drawPile)} left`;

  return (
    <div className="DrawPile">
      {lastCard && <Cards cards={[[lastCard, nextCard]]} />}
      <div>{displayText}</div>
    </div>
  );
};

export default DrawPile;
