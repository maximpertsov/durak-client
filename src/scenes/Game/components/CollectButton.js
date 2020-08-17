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

  (state, user) => ({
    hands: state.hands,
    isDefender: user === getDefender(state),
    table: state.table,
    user,
    unbeatenCards: getUnbeatenCards(state),
  }),
);

const CollectButton = () => {
  const io = useWebSocketContext();

  const { isDefender, table, unbeatenCards } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const collectAttack = () => {
    io.send('collected', {});
  };

  if (!isDefender) return null;
  if (isEmpty(table)) return null;
  if (isEmpty(unbeatenCards)) return null;

  return (
    <button type="button" onClick={collectAttack}>
      collect cards
    </button>
  );
};

export default CollectButton;
