import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { getDefender, getTable, getUnbeatenCards, getYielded } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    hasYielded: getYielded(state).includes(state.user),
    isDefender: state.user === getDefender(state),
    table: getTable(state),
    unbeatenCards: getUnbeatenCards(state),
  }),
);

const YieldButton = () => {
  const io = useWebSocketContext();

  const { hasYielded, isDefender, table, unbeatenCards } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const yieldAttack = () => {
    io.send('yielded_attack', {});
  };

  // TODO: add auto-yield if no cards can be thrown

  if (hasYielded) return null;
  if (isDefender) return null;
  if (isEmpty(table)) return null;
  if (!isEmpty(unbeatenCards)) return null;

  return (
    <Button circular size="big" onClick={yieldAttack}>
      stop attacking
    </Button>
  );
};

export default YieldButton;
