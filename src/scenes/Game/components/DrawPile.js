import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const DrawPile = () => {
  const drawPile = useSelector(state => state.drawPile, isEqual);

  const nextCard = drawPile[0];
  const displayText = `${drawPile.length} left`;

  return (
    <div className="DrawPile">
      <Cards flipped cards={[nextCard]} />
      <div>{displayText}</div>
    </div>
  );
};

export default DrawPile;
