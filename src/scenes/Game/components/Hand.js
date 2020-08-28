import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button } from 'semantic-ui-react';

import compact from 'lodash/compact';
import first from 'lodash/first';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import { getDefender, getGame } from 'reducers';
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
    isDefender: defender === state.user,
    isOutOfGame: durak !== null || !state.players.includes(state.user),
    isDurak: durak === state.user,
    user: state.user,
  }),
);

const RestartButton = () => {
  const game = useSelector(() => getGame());
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
  const { cards, isDefender, isDurak, isOutOfGame, user } = useSelector(
    mapStateToProps,
    isEqual,
  );

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
    </div>
  );
};

export default Hand;
