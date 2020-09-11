import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import reject from 'lodash/reject';

import {
  getAttackers,
  getCollector,
  getDefender,
  getDurak,
  getGame,
  getHands,
  getPlayers,
  getPlayersFromUser,
  getWinners,
  getWithPassing,
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
  state => getCollector(state),
  state => getDefender(state),
  state => getDurak(state),

  (state, playersFromUser, collector, defender, durak) => ({
    collector,
    defender,
    game: getGame(),
    hands: getHands(state),
    hasMessages: !isEmpty(reject(state.messages, { type: 'initialized' })),
    isAttacker: getAttackers(state).includes(state.user),
    isDefender: defender === state.user,
    isDurak: durak && durak === state.user,
    isCollecting: collector && collector === state.user,
    isLoading: state.remoteDataState !== 'REPLAYED_EVENTS',
    isOutOfGame: getWinners(state).includes(state.user),
    players: getPlayers(state),
    withPassing: getWithPassing(state),
    user: state.user,
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
  [MediaQuery.WIDE]: {
    width: '50vw',
  },
});

const PlayersWrapper = styled.div({
  [MediaQuery.NARROW]: {
    gridTemplateColumns: 'repeat(4, minmax(20vw, 1fr))',
  },
  [MediaQuery.WIDE]: {
    gridTemplateColumns: 'repeat(2, minmax(20vw, 1fr))',
  },
  display: 'grid',
});

const Game = () => {
  const {
    collector,
    defender,
    hasMessages,
    isAttacker,
    isCollecting,
    isDefender,
    isDurak,
    isOutOfGame,
    isLoading,
    game,
    players,
    user,
    withPassing,
  } = useSelector(mapStateToProps, isEqual);

  const renderTable = () => (
    <TableWrapper>
      <Table />
      {withPassing && <PassCards />}
    </TableWrapper>
  );

  // eslint-disable-next-line complexity
  const getMessage = () => {
    if (isDurak) return `${rofl} You're the durak! ${rofl}`;
    if (isOutOfGame) {
      return `${popcorn} Relax, you're not the durak! ${popcorn}`;
    }
    if (isCollecting) return 'You are collecting';
    if (collector) return `You are giving additional cards to ${collector}`;
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

  // eslint-disable-next-line complexity
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

  const renderPlayers = () =>
    players.map(player => <Player key={player} player={player} />);

  const renderGame = () => (
    <Wrapper>
      <FlexSectionWrapper>
        <Messages />
        {renderTable()}
        {renderButtons()}
        {renderTopMessage()}
        <Hand />
      </FlexSectionWrapper>
      <FlexSectionWrapper>
        <PlayersWrapper>{renderPlayers()}</PlayersWrapper>
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
