import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import { getPlayersFromUser } from 'reducers';
import client from 'utils/client';
import { useWebSocketContext } from 'utils/websockets';

import Hand from './components/Hand';
import Messages from './components/Messages';
import Player from './components/Player';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';

const Wrapper = styled.div({
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 2fr 1fr',
  gridGap: '0.25rem',
});
const TopBottomWrapper = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 4,
});

const Game = () => {
  const io = useWebSocketContext();
  const playersFromUser = useSelector(getPlayersFromUser, isEqual);

  useEffect(() => {
    client.get('game/abc123/events').then(response => {
      response.data.events.forEach(event => {
        io.send(event.type, event.payload);
      });
    });
  }, [io]);

  const renderGame = () => {
    const [user, player2, player3, player4] = playersFromUser;

    return (
      <Wrapper>
        {player3 && (
          <TopBottomWrapper>
            <Player player={player3} />
          </TopBottomWrapper>
        )}
        {player2 && <Player player={player2} />}
        <Table />
        {player4 && <Player player={player4} />}
        {user && (
          <TopBottomWrapper>
            <Hand />
          </TopBottomWrapper>
        )}
      </Wrapper>
    );
  };

  return (
    <div className="Game">
      <WebSocketEventListener />
      {renderGame()}
      <Messages />
    </div>
  );
};

export default Game;
