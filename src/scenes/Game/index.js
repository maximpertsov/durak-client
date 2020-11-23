import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import some from 'lodash/some';

import {
  getAttackers,
  getCollector,
  getDefender,
  getDurak,
  getGame,
  getHands,
  getJoined,
  getPlayers,
  getWinners,
  getWithPassing,
} from 'reducers';
import { Emoji, MediaQuery } from 'styles';

import AI from './components/AI';
import CollectButton from './components/CollectButton';
import GameInitializer from './components/GameInitializer';
import Hand from './components/Hand';
import Messages from './components/Messages';
import PassCards from './components/PassCards';
import Player from './components/Player';
import RestartButton from './components/RestartButton';
import StartButton from './components/StartButton';
import Table from './components/Table';
import YieldButton from './components/YieldButton';

const mapStateToProps = createSelector(
  state => state,
  state => getCollector(state),
  state => getDefender(state),
  state => getDurak(state),
  state => getHands(state),

  (state, collector, defender, durak, hands) => ({
    collector,
    defender,
    game: getGame(),
    hasCards: !isEmpty(get(hands, [state.user, 'hand'])),
    // TODO: find a better way to manage this
    gameHasStarted:
      !getJoined(state)
      && some(state.messages, message => get(message, 'toState.attackers')),
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

const PlayersWrapper = styled.div(props => ({
  [MediaQuery.NARROW]: {
    gridTemplateColumns: `repeat(${props.playerCount}, 1fr)`,
  },
  [MediaQuery.WIDE]: {
    gridTemplateColumns: 'repeat(2, minmax(10vw, 1fr))',
  },
  display: 'grid',
}));

const Game = () => {
  const {
    collector,
    defender,
    hasCards,
    isAttacker,
    isCollecting,
    isDefender,
    isDurak,
    isOutOfGame,
    isLoading,
    gameHasStarted,
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
    if (isDurak) return `${Emoji.ROFL} You're the durak! ${Emoji.ROFL}`;
    if (isOutOfGame) {
      return `${Emoji.POPCORN} Relax, you're not the durak! ${Emoji.POPCORN}`;
    }
    if (isCollecting) return 'You are collecting';
    if (collector) return `You are giving additional cards to ${collector}`;
    if (isAttacker) {
      return `${Emoji.DAGGER} You are attacking ${defender} ${Emoji.DAGGER}`;
    }
    if (isDefender) return `${Emoji.SHIELD} You are defending ${Emoji.SHIELD}`;

    return 'Waiting for other players';
  };

  const renderTopMessage = () =>
    getMessage() && (
      <Segment tertiary>
        <h2>{getMessage()}</h2>
      </Segment>
    );

  // eslint-disable-next-line complexity
  const renderButton = () => {
    if (isDurak) return <RestartButton />;
    if (!gameHasStarted) return <StartButton />;
    if (isOutOfGame) return null;
    if (isDefender) return hasCards ? <CollectButton /> : null;

    return <YieldButton />;
  };

  const renderButtons = () => (
    <ButtonWrapper>
      <div>{renderButton()}</div>
    </ButtonWrapper>
  );

  const renderPlayers = () =>
    players.map((player, index) => (
      <Player key={player} player={player} order={index + 1} />
    ));

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
        <PlayersWrapper playerCount={size(players)}>
          {renderPlayers()}
        </PlayersWrapper>
      </FlexSectionWrapper>
    </Wrapper>
  );

  if (!user) return null;
  if (!game) return null;

  return (
    <div className="Game">
      <GameInitializer />
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      {!isLoading && renderGame()}
      {!isLoading && <AI />}
    </div>
  );
};

export default Game;
