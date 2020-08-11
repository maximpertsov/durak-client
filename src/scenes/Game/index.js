import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import { getPlayersFromUser } from 'reducers';
import _ from 'utils/lodash';

import DrawListener from './components/DrawListener';
import DrawPile from './components/DrawPile';
import DurakListener from './components/DurakListener';
import GameInitializer from './components/GameInitializer';
import Hand from './components/Hand';
import Messages from './components/Messages';
import Player from './components/Player';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';
import YieldListener from './components/YieldListener';

const Wrapper = styled.div({
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 2fr 1fr',
  gridGap: '0.25rem',
  height: '500px',
});

const mapStateToProps = createSelector(
  state => state,
  state => getPlayersFromUser(state),

  (state, playersFromUser) => ({
    user: state.user,
    ..._.zipObject(
      ['player1', 'player2', 'player3', 'player4'],
      playersFromUser,
    ),
  }),
);

const Game = () => {
  const { user, player2, player3, player4 } = useSelector(
    mapStateToProps,
    _.isEqual,
  );

  const renderGame = () => (
    <Wrapper>
      <div />
      <Player player={player3} />
      <DrawPile />
      <Player player={player2} />
      <Table />
      <Player player={player4} />
      <Messages />
      <Hand />
      <div />
    </Wrapper>
  );

  if (!user) return null;

  return (
    <div className="Game">
      <GameInitializer />
      <DurakListener />
      <WebSocketEventListener />
      <YieldListener />
      <DrawListener />
      {renderGame()}
    </div>
  );
};

export default Game;
