import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import { getAttackers } from 'reducers';
import { canAttack } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const Wrapper = styled.div({
  backgroundColor: 'green',
  height: '100%',
});

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),

  (state, attackers) => ({
    userCanAttack: attackers.includes(state.username),
    table: state.table,
  }),
);

const Table = () => {
  const io = useWebSocketContext();
  const { table, userCanAttack } = useSelector(mapStateToProps, isEqual);

  const canDrop = (card, monitor) => {
    if (!monitor.isOver({ shallow: true })) return false;
    if (!userCanAttack) return false;

    return canAttack({ table, card });
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
