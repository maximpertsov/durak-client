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
        const payload = {
          game: event.game,
          user: event.user,
          ...event.payload,
        };
        io.send(event.type, payload);
      });
    });
  }, [io]);

  const renderGame = () => {
    if (playersFromUser.length < 4) return null;

    return (
      <Wrapper>
        <TopBottomWrapper>
          <Player player={playersFromUser[2]} />
        </TopBottomWrapper>
        <Player player={playersFromUser[1]} />
        <Table />
        <Player player={playersFromUser[3]} />
        <TopBottomWrapper>
          <Hand />
        </TopBottomWrapper>
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
