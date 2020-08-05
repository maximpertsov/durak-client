import React from 'react';
import { useSelector } from 'react-redux';
import first from 'lodash/first';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';

import Cards from './Cards';

const DrawPile = () => {
  const drawPile = useSelector(state => state.drawPile, isEqual);

  const nextCard = { flipped: true, ...first(drawPile) };
  const lastCard = last(drawPile);
  const displayText = `${drawPile.length} left`;

  return (
    <div className="DrawPile">
      <Cards flipped cards={[[lastCard, nextCard]]} />
      <div>{displayText}</div>
    </div>
  );
};

export default DrawPile;
