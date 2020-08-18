import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Dimmer, Loader } from 'semantic-ui-react';

import compact from 'lodash/compact';
import first from 'lodash/first';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import zipObject from 'lodash/zipObject';

import { getPlayersFromUser } from 'reducers';

import tenguyscrambled from './assets/tenguyscrambled.png';
import DrawPile from './components/DrawPile';
import GameInitializer from './components/GameInitializer';
import Hand from './components/Hand';
import Messages from './components/Messages';
import PassCards from './components/PassCards';
import Player from './components/Player';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';

const getDurak = ({ drawPile, hands }) => {
  if (!isEmpty(drawPile)) return null;

  const playersWithCards = flatMap(hands, (hand, player) =>
    (isEmpty(compact(hand)) ? [] : [player]),
  );
  if (size(playersWithCards) !== 1) return null;

  return first(playersWithCards);
};

const mapStateToProps = createSelector(
  state => state,
  state => getPlayersFromUser(state),

  (state, playersFromUser) => ({
    hands: state.hands,
    isDurak: getDurak(state) === state.user,
    isLoading: state.remoteDataState !== 'REPLAYED_EVENTS',
    ...zipObject(['user', 'player2', 'player3', 'player4'], playersFromUser),
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
  const { isLoading, isDurak, player2, player3, player4 } = useSelector(
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
        {!isDurak && <Messages />}
        {!isDurak && renderTable()}
        {isDurak && <img src={tenguyscrambled} alt="durak" />}
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
      <WebSocketEventListener />
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      {!isLoading && renderGame()}
    </div>
  );
};

export default Game;
