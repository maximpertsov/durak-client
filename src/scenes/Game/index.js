import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import zipObject from 'lodash/zipObject';

import { getPlayersFromUser } from 'reducers';

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
    hands: state.hands,
    playerCount: size(playersFromUser),
    ...zipObject(['user', 'player2', 'player3', 'player4'], playersFromUser),
  }),
);

const Game = () => {
  const { hands, playerCount, player2, player3, player4 } = useSelector(
    mapStateToProps,
    isEqual,
  );

  // TODO: guarded by magic player count, should be a query (e.g. game is full)
  const renderGame = () => {
    if (size(hands) !== 4) return null;
    if (playerCount !== 4) return null;

    return (
      <Wrapper>
        <div />
        <Player player={player3} />
        <DrawPile />
        <Player player={player2} />
        <Table />
        <Player player={player4} />
        <div />
        <Hand />
        <div />
      </Wrapper>
    );
  };

  return (
    <div className="Game">
      <GameInitializer />
      <DurakListener />
      <WebSocketEventListener />
      <YieldListener />
      <DrawListener />
      {renderGame()}
      <Messages />
    </div>
  );
};

export default Game;
