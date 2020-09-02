import React from 'react';
import { useSelector } from 'react-redux';

import compact from 'lodash/compact';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import Cards from './Cards';

const DrawPile = () => {
  const drawPile = useSelector(state => state.drawPile, isEqual);

  const nextCard = size(drawPile) > 1 ? { flipped: true } : null;
  const lastCard = size(drawPile) > 0 ? { card: last(drawPile) } : null;
  const displayText = `${size(drawPile)} left`;

  return (
    <div className="DrawPile">
      {lastCard && <Cards cards={[compact([lastCard, nextCard])]} />}
      <div>{displayText}</div>
    </div>
  );
};

export default DrawPile;
