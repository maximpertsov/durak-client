import React from 'react';
import { useSelector } from 'react-redux';

import _ from 'utils/lodash';

import Cards from './Cards';

const DrawPile = () => {
  const drawPile = useSelector(state => state.drawPile, _.isEqual);

  const nextCard = { flipped: true, ..._.first(drawPile) };
  const lastCard = _.last(drawPile);
  const displayText = `${_.size(drawPile)} left`;

  return (
    <div className="DrawPile">
      {lastCard && <Cards cards={[[lastCard, nextCard]]} />}
      <div>{displayText}</div>
    </div>
  );
};

export default DrawPile;
