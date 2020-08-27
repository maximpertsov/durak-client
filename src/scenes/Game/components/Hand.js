import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Segment } from 'semantic-ui-react';

import compact from 'lodash/compact';
import first from 'lodash/first';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import { getAttackers, getDefender } from 'reducers';
import client from 'utils/client';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';
import CollectButton from './CollectButton';
import YieldButton from './YieldButton';

const getDurak = ({ drawPile, hands }) => {
  if (!isEmpty(drawPile)) return null;

  const playersWithCards = flatMap(hands, (hand, player) => {
    if (isEmpty(compact(hand))) return [];

    return [player];
  });

  if (size(playersWithCards) !== 1) return null;

  return first(playersWithCards);
};

const mapStateToProps = createSelector(
  state => state,
  state => getDefender(state),
  state => getDurak(state),

  (state, defender, durak) => ({
    cards: state.hands[state.user],
    isAttacker: getAttackers(state).includes(state.user),
    isDefender: defender === state.user,
    isOutOfGame: durak !== null || !state.players.includes(state.user),
    isDurak: durak === state.user,
    defender,
    user: state.user,
  }),
);

const RestartButton = () => {
  const game = useSelector(state => state.game);
  const io = useWebSocketContext();

  const restartGame = () => {
    client.post(`game/${game}/restart`).then(() => {
      io.send('restarted', {});
    });
  };

  return (
    <Button circular size="big" onClick={restartGame}>
      play again
    </Button>
  );
};

const ButtonWrapper = styled.div({
  marginBottom: '15px',
});

const Hand = () => {
  const {
    cards,
    isAttacker,
    isDefender,
    isDurak,
    isOutOfGame,
    defender,
    user,
  } = useSelector(mapStateToProps, isEqual);

  const dagger = String.fromCodePoint(0x1f5e1);
  const shield = String.fromCodePoint(0x1f6e1);
  const popcorn = String.fromCodePoint(0x1f37f);
  const rofl = String.fromCodePoint(0x1f923);

  const renderMessage = () => {
    if (isDurak) return `${rofl} You're the durak! ${rofl}`;
    if (isOutOfGame) {
      return `${popcorn} Relax, you're not the durak! ${popcorn}`;
    }
    if (isAttacker) return `${dagger} You are attacking ${defender} ${dagger}`;
    if (isDefender) return `${shield} You are defending ${shield}`;

    return null;
  };

  const renderButtons = () => {
    if (isDurak) return <RestartButton />;
    if (isOutOfGame) return null;
    if (isDefender) return <CollectButton />;

    return <YieldButton />;
  };

  return (
    <div className="Hand">
      <ButtonWrapper>
        <div>{renderButtons()}</div>
      </ButtonWrapper>
      <Cards cards={cards} />
      <h2>{user}</h2>
      {renderMessage() && (
        <Segment tertiary>
          <h2>{renderMessage()}</h2>
        </Segment>
      )}
    </div>
  );
};

export default Hand;
