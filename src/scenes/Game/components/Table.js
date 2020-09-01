import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import every from 'lodash/every';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import actions from 'actions';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';
import DrawPile from './DrawPile';

const Wrapper = styled.div(props => ({
  backgroundColor: 'green',
  display: 'grid',
  gridTemplateColumns: '65px 1fr',
  height: '40vh',
  flexGrow: 1,
  margin: '0 0 10px 0',
  opacity: props.isOver ? '90%' : '100%',
  padding: '10px',
}));

const mapStateToProps = createSelector(
  state => state,
  state => last(state.messages),

  (state, lastMessage) => ({
    legalAttacksCards: get(lastMessage, 'toState.legalAttacks.cards', []),
    legalAttacksLimit: get(lastMessage, 'toState.legalAttacks.limit', 0),
    selectedCards: state.selectedCards,
    table: state.table,
  }),
);

const Table = () => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();
  const {
    legalAttacksCards,
    legalAttacksLimit,
    selectedCards,
    table,
  } = useSelector(mapStateToProps, isEqual);

  const canAttackWithCard = card => {
    if (legalAttacksLimit < 1) return false;

    return legalAttacksCards.includes(card);
  };

  const canDrop = (item, monitor) => {
    if (!monitor.isOver({ shallow: true })) return false;

    return canAttackWithCard(item.card);
  };

  // TODO: move logic to action?
  const drop = item => {
    if (isEmpty(selectedCards)) {
      io.send('attacked', { card: item.card });
    } else {
      io.send('attacked_with_many', { cards: selectedCards });
    }
    dispatch(actions.game.selectedCards.clear());
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  const attackWithSelectedCards = () => {
    try {
      if (isEmpty(selectedCards)) return;
      if (size(selectedCards) > legalAttacksLimit) return;
      if (!every(selectedCards, canAttackWithCard)) return;

      io.send('attacked_with_many', { cards: selectedCards });
    } finally {
      dispatch(actions.game.selectedCards.clear());
    }
  };

  return (
    <Wrapper
      className="Table"
      onClick={attackWithSelectedCards}
      isOver={isOver}
      ref={dropRef}
    >
      <div>
        <DrawPile />
      </div>
      <div>
        <Cards cards={table.map(stack => stack.map(card => ({ card })))} />
      </div>
    </Wrapper>
  );
};

export default Table;
