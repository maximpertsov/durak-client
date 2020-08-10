import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import { getAttackers, getDefender, getUnbeatenCards } from 'reducers';
import { canAttack } from 'utils/gameLogic';
import _ from 'utils/lodash';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const Wrapper = styled.div({
  backgroundColor: 'green',
  height: '250px',
});

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),
  state => getDefender(state),
  state => getUnbeatenCards(state),

  (state, attackers, defender, unbeatenCards) => ({
    freeDefenseCardCount:
      _.size(_.compact(state.hands[defender])) - _.size(unbeatenCards),
    table: state.table,
    userCanAttack: attackers.includes(state.user),
  }),
);

const Table = () => {
  const io = useWebSocketContext();
  const { freeDefenseCardCount, table, userCanAttack } = useSelector(
    mapStateToProps,
    _.isEqual,
  );

  const canDrop = (card, monitor) => {
    if (!monitor.isOver({ shallow: true })) return false;
    if (!userCanAttack) return false;
    if (freeDefenseCardCount < 1) return false;

    return canAttack({ table, card });
  };

  const drop = item => {
    io.send('attacked', item);
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
