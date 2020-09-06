import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Progress } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import {
  getCollector,
  getDefender,
  getTable,
  getUnbeatenCards,
} from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const COLLECT_DELAY = 10000;
const STEP = 10;

const mapStateToProps = createSelector(
  state => state,
  state => state.user,
  state => getCollector(state),

  (state, user, collector) => ({
    collector,
    isCollecting: collector && collector === user,
    isDefender: user === getDefender(state),
    table: getTable(state),
    user,
    unbeatenCards: getUnbeatenCards(state),
  }),
);

// TODO: rename to CollectHandler to capture extra collect logic
const CollectButton = () => {
  const io = useWebSocketContext();
  const [tick, setTick] = React.useState(0);

  const {
    collector,
    isCollecting,
    isDefender,
    table,
    unbeatenCards,
  } = useSelector(mapStateToProps, isEqual);

  const giveUp = () => {
    io.send('gave_up', {});
  };

  React.useEffect(() => {
    if (collector && tick % STEP === 0) {
      setTimeout(() => {
        if (tick < COLLECT_DELAY) {
          setTick(tick + STEP);
          return;
        }

        if (isCollecting) {
          io.send('collected', {});
        }
        setTimeout(() => {
          // Reset timer
          setTick(0);
        }, 100);
      }, STEP);
    }
  }, [collector, isCollecting, io, tick, setTick]);

  const renderCollectingTimer = () => (
    <Progress
      precision={0.01}
      value={tick}
      total={COLLECT_DELAY}
      progress="percent"
    >
      {`${collector} is collecting`}
    </Progress>
  );

  if (collector) return renderCollectingTimer();
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
