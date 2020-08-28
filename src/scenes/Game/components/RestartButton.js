import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { getGame } from 'reducers';
import client from 'utils/client';
import { useWebSocketContext } from 'utils/websockets';

const RestartButton = () => {
  const game = useSelector(() => getGame());
  const io = useWebSocketContext();

  const restartGame = () => {
    client.post(`game/${game}/restart`).then(() => {
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
