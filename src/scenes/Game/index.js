import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import reject from 'lodash/reject';
import zipObject from 'lodash/zipObject';

import {
  getAttackers,
  getDefender,
  getDurak,
  getGame,
  getPlayersFromUser,
  getWinners,
} from 'reducers';
import { MediaQuery } from 'styles';

import CollectButton from './components/CollectButton';
import GameInitializer from './components/GameInitializer';
import Hand from './components/Hand';
import Messages from './components/Messages';
import PassCards from './components/PassCards';
import Player from './components/Player';
import RestartButton from './components/RestartButton';
import StartButton from './components/StartButton';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';
import YieldButton from './components/YieldButton';

const dagger = String.fromCodePoint(0x1f5e1);
const shield = String.fromCodePoint(0x1f6e1);
const popcorn = String.fromCodePoint(0x1f37f);
const rofl = String.fromCodePoint(0x1f923);

const mapStateToProps = createSelector(
  state => state,
  state => getPlayersFromUser(state),
  state => getDefender(state),
  state => getDurak(state),

  (state, playersFromUser, defender, durak) => ({
    defender,
    game: getGame(),
    hands: state.hands,
    hasMessages: !isEmpty(reject(state.messages, { type: 'initialized' })),
    isLoading: state.remoteDataState !== 'REPLAYED_EVENTS',
    isAttacker: getAttackers(state).includes(state.user),
    isDefender: defender === state.user,
    isOutOfGame: getWinners(state).includes(state.user),
    isDurak: durak && durak === state.user,
    user: state.user,
    ...zipObject(['player1', 'player2', 'player3', 'player4'], playersFromUser),
  }),
);

const Wrapper = styled.div({
  [MediaQuery.NARROW]: {
    flexDirection: 'column-reverse',
  },
  [MediaQuery.WIDE]: {
    flexDirection: 'row',
  },
  display: 'flex',
  margin: '5px 20px',
});

const TableWrapper = styled.div({
  alignItems: 'stretch',
  display: 'flex',
});

const ButtonWrapper = styled.div({
  marginBottom: '15px',
});

const FlexSectionWrapper = styled.div({
  flexGrow: 1,
  padding: '0px 1vw',
});

const PlayersWrapper = styled.div({
  [MediaQuery.NARROW]: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  [MediaQuery.WIDE]: {
    flexDirection: 'column',
  },
  display: 'flex',
});

const Game = () => {
  const {
    defender,
    hasMessages,
    isAttacker,
    isDefender,
    isDurak,
    isOutOfGame,
    isLoading,
    game,
    player2,
    player3,
    player4,
    user,
  } = useSelector(mapStateToProps, isEqual);

  const renderTable = () => (
    <TableWrapper>
      <Table />
      <PassCards />
    </TableWrapper>
  );

  const getMessage = () => {
    if (isDurak) return `${rofl} You're the durak! ${rofl}`;
    if (isOutOfGame) {
      return `${popcorn} Relax, you're not the durak! ${popcorn}`;
    }
    if (isAttacker) return `${dagger} You are attacking ${defender} ${dagger}`;
    if (isDefender) return `${shield} You are defending ${shield}`;

    return null;
  };

  const renderTopMessage = () =>
    getMessage() && (
      <Segment tertiary>
        <h2>{getMessage()}</h2>
      </Segment>
    );

  const renderButton = () => {
    if (!hasMessages) return <StartButton />;
    if (isDurak) return <RestartButton />;
    if (isOutOfGame) return null;
    if (isDefender) return <CollectButton />;

    return <YieldButton />;
  };

  const renderButtons = () => (
    <ButtonWrapper>
      <div>{renderButton()}</div>
    </ButtonWrapper>
  );

  const renderGame = () => (
    <Wrapper>
      <FlexSectionWrapper>
        {renderTopMessage()}
        {renderTable()}
        {renderButtons()}
        <Hand />
        <Messages />
      </FlexSectionWrapper>
      <FlexSectionWrapper>
        <PlayersWrapper>
          <Player player={player2} />
          <Player player={player3} />
          <Player player={player4} />
        </PlayersWrapper>
      </FlexSectionWrapper>
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
