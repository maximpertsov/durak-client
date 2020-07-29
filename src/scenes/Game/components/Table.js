import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import actions from 'actions';
import { canAttack } from 'utils/gameLogic';

import Cards from './Cards';

const Wrapper = styled.div({
  backgroundColor: 'green',
  height: '400px',
});

const Table = () => {
  const dispatch = useDispatch();
  const table = useSelector(state => state.table, isEqual);

  const canDrop = (card, monitor) => {
    if (!canAttack({ table, card })) return false;

    return monitor.isOver({ shallow: true });
  };

  const drop = ({ suit, rank, player }) => {
    dispatch(actions.game.table.append({ suit, rank }));
    dispatch(actions.game.hand.remove({ suit, rank, player }));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
  });

  return (
    <Wrapper className="Table" isOver={isOver} ref={dropRef}>
      <Cards cards={table} />
    </Wrapper>
  );
};

export default Table;
