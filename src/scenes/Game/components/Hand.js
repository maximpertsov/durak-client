import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { getDefender, getUnbeatenCards } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,
  state => state.username,

  (state, username) => ({
    cards: state.hands[username],
    hasYielded: state.yielded.includes(username),
    isDefender: username === getDefender(state),
    table: state.table,
    username,
    unbeatenCards: getUnbeatenCards(state),
  }),
);

const Hand = () => {
  const io = useWebSocketContext();

  const {
    cards,
    hasYielded,
    isDefender,
    table,
    username,
    unbeatenCards,
  } = useSelector(mapStateToProps, isEqual);

  const yieldAttack = () => {
    io.send('yielded_attack', { user: username });
  };

  const renderYieldButton = () => {
    if (hasYielded) return null;
    if (isDefender) return null;
    if (isEmpty(table)) return null;
    if (!isEmpty(unbeatenCards)) return null;

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
