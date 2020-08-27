import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import compact from 'lodash/compact';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import some from 'lodash/some';

import actions from 'actions';
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
    selectedCards: state.selectedCards,
    table: state.table,
  }),
);

const Wrapper = styled.div(props => ({
  backgroundColor: 'blue',
  height: '40vh',
  margin: '0 0 10px 0',
  opacity: props.isOver ? '90%' : '100%',
  padding: '10px',
  width: '20%',
}));

const PassCards = () => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();
  const {
    freeDefenseCardCount,
    hand,
    isDefender,
    selectedCards,
    table,
  } = useSelector(mapStateToProps, isEqual);

  const canDrop = card => {
    if (!isDefender) return false;
    if (freeDefenseCardCount < Math.max(1, size(selectedCards))) return false;

    return canPass({ card, table });
  };

  const canDropAny = () => some(compact(hand), canDrop);

  const drop = item => {
    if (isEmpty(selectedCards)) {
      io.send('passed', {
        card: { rank: item.rank, suit: item.suit },
      });
    } else {
      io.send('passed_with_many', { cards: selectedCards });
    }
    dispatch(actions.game.selectedCards.clear());
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
