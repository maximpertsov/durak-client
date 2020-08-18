import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import compact from 'lodash/compact';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import some from 'lodash/some';

import { getDefender, getUnbeatenCards } from 'reducers';
import { canPass } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

const getNextPlayer = ({ players, user }) => {
  const index = findIndex(players, player => player === user);

  return players[(index + 1) % size(players)];
};

const mapStateToProps = createSelector(
  state => state,
  state => getNextPlayer(state),
  state => getUnbeatenCards(state),

  (state, nextPlayer, unbeatenCards) => ({
    freeDefenseCardCount:
      size(compact(state.hands[nextPlayer])) - size(unbeatenCards),
    hand: get(state.hands, state.user),
    isDefender: state.user === getDefender(state),
    table: state.table,
  }),
);

const Wrapper = styled.div(props => ({
  backgroundColor: 'blue',
  height: '250px',
  opacity: props.isOver ? '90%' : '100%',
  padding: '10px',
  width: '20%',
}));

const PassCards = () => {
  const io = useWebSocketContext();
  const { freeDefenseCardCount, hand, isDefender, table } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const canDrop = card => {
    if (!isDefender) return false;
    // TODO: allow player to throw multiple cards at once
    if (freeDefenseCardCount < 1) return false;

    return canPass({ card, table });
  };

  const canDropAny = () => some(compact(hand), canDrop);

  const drop = item => {
    io.send('passed', {
      card: { rank: item.rank, suit: item.suit },
    });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  if (!canDropAny()) return null;

  return (
    <Wrapper className="PassCards" isOver={isOver} ref={dropRef}>
      <h2>Drop card here to pass</h2>
    </Wrapper>
  );
};

export default PassCards;
