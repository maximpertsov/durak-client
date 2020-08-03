import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

import { getDefender } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,
  state => state.username,

  (state, username) => ({
    cards: state.hands[username],
    hasYielded: state.yielded.includes(username),
    isDefender: username === getDefender(state),
    username,
  }),
);

const Hand = () => {
  const io = useWebSocketContext();

  const { cards, hasYielded, isDefender, username } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const yieldAttack = () => {
    io.send('yielded_attack', { user: username });
  };

  const renderYieldButton = () => {
    if (hasYielded) return null;
    if (isDefender) return null;

    return (
      <button type="button" onClick={yieldAttack}>
        stop attacking
      </button>
    );
  };

  return (
    <div className="Hand">
      {renderYieldButton()}
      <h2>{username}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
