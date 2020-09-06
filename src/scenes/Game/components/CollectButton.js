import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import {
  getCollector,
  getDefender,
  getTable,
  getUnbeatenCards,
} from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const COLLECT_DELAY = 3000;

const mapStateToProps = createSelector(
  state => state,
  state => state.user,

  (state, user) => ({
    isCollecting: user === getCollector(state),
    isDefender: user === getDefender(state),
    table: getTable(state),
    user,
    unbeatenCards: getUnbeatenCards(state),
  }),
);

// TODO: rename to CollectHandler to capture extra collect logic
const CollectButton = () => {
  const io = useWebSocketContext();

  const { isCollecting, isDefender, table, unbeatenCards } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const giveUp = () => {
    io.send('gave_up', {});
  };

  React.useEffect(() => {
    if (isCollecting) {
      setTimeout(() => {
        io.send('collect_cards', {});
      }, COLLECT_DELAY);
    }
  }, [isCollecting, io]);

  if (isCollecting) return null;
  if (!isDefender) return null;
  if (isEmpty(table)) return null;
  if (isEmpty(unbeatenCards)) return null;

  return (
    <Button circular size="big" onClick={giveUp}>
      collect cards
    </Button>
  );
};

export default CollectButton;
