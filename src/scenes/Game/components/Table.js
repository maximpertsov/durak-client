import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import { canAttack } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const Wrapper = styled.div({
  backgroundColor: 'green',
  height: '100%',
});

const Table = () => {
  const io = useWebSocketContext();
  const table = useSelector(state => state.table, isEqual);

  const canDrop = (card, monitor) => {
    if (!canAttack({ table, card })) return false;

    return monitor.isOver({ shallow: true });
  };

  const drop = item => {
    io.send('ATTACKED', item);
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
