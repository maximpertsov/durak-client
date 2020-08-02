import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const Player = ({ player }) => {
  const cards = useSelector(state => state.hands[player], isEqual);

  // TODO: this should not be visible in a real game
  return (
    <div className="Player">
      <h2>{player}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Player;
