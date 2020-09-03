import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';

import {
  getAttackLimit,
  getGame,
  getLowestRank,
  getWithPassing,
} from 'reducers';
import client from 'utils/client';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    game: getGame(),
    lowestRank: getLowestRank(state),
    attackLimit: getAttackLimit(state),
    withPasses: getWithPassing(state),
  }),
);

const RestartButton = () => {
  const { game, lowestRank, attackLimit, withPassing } = useSelector(
    mapStateToProps,
    isEqual,
  );
  const io = useWebSocketContext();

  const restartGame = () => {
    client
      .patch(`game/${game}`, {
        variant: { lowestRank, attackLimit, withPassing },
      })
      .then(() => {
        io.send('restarted', {});
      });
  };

  return (
    <Button circular size="big" onClick={restartGame}>
      play again
    </Button>
  );
};

export default RestartButton;
