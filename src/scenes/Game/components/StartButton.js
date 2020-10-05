import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';

import { getJoined } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  state => getJoined(state),

  (state, joined) => ({
    hasJoined: joined && joined.includes(state.user),
    // TODO: find a better way to manage this
    gameHasStarted:
      !joined
      && some(state.messages, message => get(message, 'toState.attackers')),
  }),
);

const StartButton = () => {
  const io = useWebSocketContext();

  const { gameHasStarted, hasJoined } = useSelector(mapStateToProps, isEqual);

  const startGame = () => {
    io.send('started_game', {});
  };

  if (gameHasStarted) return null;
  if (hasJoined) return null;

  return (
    <Button circular size="big" onClick={startGame}>
      join game
    </Button>
  );
};

export default StartButton;
