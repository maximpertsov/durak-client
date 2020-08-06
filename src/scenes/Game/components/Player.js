import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import first from 'lodash/first';
import isEqual from 'lodash/isEqual';

import { getAttackers } from 'reducers';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),
  (_, props) => props.player,

  (state, attackers, player) => ({
    cards: state.hands[player],
    isInitialAttacker: first(attackers) === player,
  }),
);

const Player = ({ player }) => {
  const { cards, isInitialAttacker } = useSelector(
    state => mapStateToProps(state, { player }),
    isEqual,
  );

  // TODO: this should not be visible in a real game
  if (!player) return <div />;

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
