import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { getDefender, getUnbeatenCards } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  state => state.user,
  state => state.yielded,

  (state, user, yielded) => ({
    hasYielded: yielded.includes(user),
    hands: state.hands,
    isDefender: user === getDefender(state),
    players: state.players,
    table: state.table,
    unbeatenCards: getUnbeatenCards(state),
    yielded,
  }),
);

const YieldButton = () => {
  const io = useWebSocketContext();

  const {
    hasYielded,
    hands,
    isDefender,
    players,
    table,
    unbeatenCards,
    yielded,
  } = useSelector(mapStateToProps, isEqual);

  const yieldAttack = () => {
    io.send('yielded_attack', { hands, players, yielded });
  };

  // TODO: add auto-yield if no cards can be thrown

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

export default YieldButton;
