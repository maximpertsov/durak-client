import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import compact from 'lodash/compact';
import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import actions from 'actions';
import { getAttackers, getDefender, getUnbeatenCards } from 'reducers';
import { canAttack } from 'utils/gameLogic';
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
  state => getAttackers(state),
  state => getDefender(state),
  state => getUnbeatenCards(state),

  (state, attackers, defender, unbeatenCards) => ({
    freeDefenseCardCount:
      size(compact(state.hands[defender])) - size(unbeatenCards),
    selectedCards: state.selectedCards,
    table: state.table,
    userCanAttack: attackers.includes(state.user),
  }),
);

const Table = () => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();
  const {
    freeDefenseCardCount,
    selectedCards,
    table,
    userCanAttack,
  } = useSelector(mapStateToProps, isEqual);

  const canAttackWithCard = card => {
    if (!userCanAttack) return false;
    if (freeDefenseCardCount < Math.max(1, size(selectedCards))) return false;

    return canAttack({ card, table });
  };

  const canDrop = (card, monitor) => {
    if (!monitor.isOver({ shallow: true })) return false;

    return canAttackWithCard(card);
  };

  // TODO: move logic to action?
  const drop = item => {
    if (isEmpty(selectedCards)) {
      io.send('attacked', {
        card: { rank: item.rank, suit: item.suit },
      });
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
    if (!isEmpty(selectedCards)) {
      if (every(selectedCards, canAttackWithCard)) {
        io.send('attacked_with_many', { cards: selectedCards });
      }
    }

    dispatch(actions.game.selectedCards.clear());
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
        <Cards cards={table} />
      </div>
    </Wrapper>
  );
};

export default Table;
