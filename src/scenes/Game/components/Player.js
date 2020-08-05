import React from 'react';
import { useSelector } from 'react-redux';
import first from 'lodash/first';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const Player = ({ player }) => {
  const cards = useSelector(state => state.hands[player], isEqual);
  const players = useSelector(state => state.players, isEqual);

  // TODO: this should not be visible in a real game
  if (!player) return <div />;

  const isInitialAttacker = first(players) === player;

  return (
    <div className="Player">
      <h2>
        {player}
        {isInitialAttacker ? '*' : ''}
      </h2>
      <Cards cards={cards} />
      <div />
    </div>
  );
};

export default Player;
