import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';

import actions from 'actions';
import { getTable } from 'reducers';
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
    selectedCards: state.selectedCards,
    table: getTable(state),
  }),
);

const Table = () => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();
  const { legalAttacksCards, selectedCards, table } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const canDrop = (item, monitor) => !!monitor.isOver({ shallow: true });

  const attackWithSelectedCards = () => {
    // TODO: technically we don't need this, since the socket server checks this.
    // That said, having this check is an easy way to prevent sending too many
    // unprocessable messages to the socket server.
    if (isEmpty(selectedCards)) return;
    // TODO: add a test for why this check is required. This check is necessary
    // because without it, sometimes clicking on the table to defend might result
    // in a simultaneous attack.
    if (!legalAttacksCards.includes(selectedCards)) return;

    io.send('attacked', { cards: selectedCards });
    dispatch(actions.game.selectedCards.clear());
  };

  const drop = () => {
    attackWithSelectedCards();
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

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
