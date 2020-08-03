import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import zipObject from 'lodash/zipObject';

import { getPlayersFromUser } from 'reducers';

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

const mapStateToProps = createSelector(
  state => getPlayersFromUser(state),

  playersFromUser => ({
    playerCount: playersFromUser.length,
    ...zipObject(['user', 'player2', 'player3', 'player4'], playersFromUser),
  }),
);

const Game = () => {
  const { playerCount, user, player2, player3, player4 } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const renderGame = () => (
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

  // TODO: guarded by magic player count, should be a query (e.g. game is full)
  return (
    <div className="Game">
      <WebSocketEventListener />
      {playerCount === 4 && renderGame()}
      <Messages />
    </div>
  );
};

export default Game;
