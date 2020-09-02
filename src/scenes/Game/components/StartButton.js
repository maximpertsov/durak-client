import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import reject from 'lodash/reject';

import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    hasMessages: !isEmpty(reject(state.messages, { type: 'initialized' })),
    isInitialAttacker:
      !isEmpty(state.players) && state.user === state.players[0],
  }),
);

const StartButton = () => {
  const io = useWebSocketContext();

  const { hasMessages, isInitialAttacker } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const startGame = () => {
    io.send('started_game', {});
  };

  if (hasMessages) return null;
  if (!isInitialAttacker) return null;

  return (
    <Button circular size="big" onClick={startGame}>
      start game
    </Button>
  );
};

export default StartButton;
