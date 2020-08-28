import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Dimmer, Loader } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';
import zipObject from 'lodash/zipObject';

import { getPlayersFromUser } from 'reducers';

import DrawPile from './components/DrawPile';
import GameInitializer from './components/GameInitializer';
import Hand from './components/Hand';
import Messages from './components/Messages';
import PassCards from './components/PassCards';
import Player from './components/Player';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';

const mapStateToProps = createSelector(
  state => state,
  state => getPlayersFromUser(state),

  (state, playersFromUser) => ({
    game: state.game,
    hands: state.hands,
    isLoading: state.remoteDataState !== 'REPLAYED_EVENTS',
    user: state.user,
    ...zipObject(['player1', 'player2', 'player3', 'player4'], playersFromUser),
  }),
);

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridGap: '0.25rem',
  padding: '5px 20px',
});

const TableWrapper = styled.div({
  alignItems: 'stretch',
  display: 'flexbox',
});

const Game = () => {
  const { game, isLoading, user, player2, player3, player4 } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const renderTable = () => (
    <TableWrapper>
      <Table />
      <PassCards />
    </TableWrapper>
  );

  const renderGame = () => (
    <Wrapper>
      <div>
        {renderTable()}
        <Hand />
        <Messages />
      </div>
      <div>
        <DrawPile />
        <Player player={player2} />
        <Player player={player3} />
        <Player player={player4} />
      </div>
    </Wrapper>
  );

  if (!user) return null;
  if (!game) return null;

  return (
    <div className="Game">
      <GameInitializer />
      <WebSocketEventListener />
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      {!isLoading && renderGame()}
    </div>
  );
};

export default Game;
