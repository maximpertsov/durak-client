import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import isEqual from 'lodash/isEqual';
import zipObject from 'lodash/zipObject';

import { getPlayersFromUser } from 'reducers';

import DrawPile from './components/DrawPile';
import DurakListener from './components/DurakListener';
import GameInitializer from './components/GameInitializer';
import Hand from './components/Hand';
import Messages from './components/Messages';
import Player from './components/Player';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';

const mapStateToProps = createSelector(
  state => state,
  state => getPlayersFromUser(state),

  (state, playersFromUser) => ({
    hands: state.hands,
    ...zipObject(['user', 'player2', 'player3', 'player4'], playersFromUser),
  }),
);

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridGap: '0.25rem',
  padding: '5px 20px',
});

const Game = () => {
  const { player2, player3, player4 } = useSelector(mapStateToProps, isEqual);

  const renderGame = () => (
    <Wrapper>
      <div>
        <Messages />
        <Table />
        <Hand />
      </div>
      <div>
        <DrawPile />
        <Player player={player2} />
        <Player player={player3} />
        <Player player={player4} />
      </div>
    </Wrapper>
  );

  return (
    <div className="Game">
      <GameInitializer />
      <DurakListener />
      <WebSocketEventListener />
      {renderGame()}
    </div>
  );
};

export default Game;
