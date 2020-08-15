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
    hands: state.hands,
    table: state.table,
    userCanAttack: attackers.includes(state.user),
  }),
);

const Table = () => {
  const io = useWebSocketContext();
  const { freeDefenseCardCount, hands, table, userCanAttack } = useSelector(
    mapStateToProps,
    _.isEqual,
  );

  const canDrop = (card, monitor) => {
    if (!monitor.isOver({ shallow: true })) return false;
    if (!userCanAttack) return false;
    if (freeDefenseCardCount < 1) return false;

    return canAttack({ hands, table });
  };

  const drop = item => {
    io.send('attacked', {
      ...item,
      card: { rank: item.rank, suit: item.suit },
      hands,
      table,
    });
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
