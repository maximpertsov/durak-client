import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import {
  getAttackLimit,
  getCollector,
  getDefender,
  getTable,
  getUnbeatenCards,
  getYielded,
} from 'reducers';
import { withWebSocket } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    attackLimit: getAttackLimit(state),
    collector: getCollector(state),
    hasYielded: getYielded(state).includes(state.user),
    isDefender: state.user === getDefender(state),
    table: getTable(state),
    unbeatenCards: getUnbeatenCards(state),
  }),
);

// eslint-disable-next-line complexity
const YieldButton = ({ io }) => {
  const {
    attackLimit,
    collector,
    hasYielded,
    isDefender,
    table,
    unbeatenCards,
  } = useSelector(mapStateToProps, isEqual);

  const yieldAttack = () => {
    io.send('yielded_attack', {});
  };

  const renderYieldButton = () => (
    <Button circular size="big" onClick={yieldAttack}>
      stop attacking
    </Button>
  );

  // TODO: add auto-yield if no cards can be thrown
  if (hasYielded) return null;
  if (isDefender) return null;
  if (isEmpty(table)) return null;
  if (attackLimit === 'unlimited') return renderYieldButton();
  if (collector) return renderYieldButton();
  if (isEmpty(unbeatenCards)) return renderYieldButton();

  return null;
};

export default withWebSocket(YieldButton);
