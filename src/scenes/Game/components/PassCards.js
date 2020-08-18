import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import compact from 'lodash/compact';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

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
    isDefender: state.user === getDefender(state),
    table: state.table,
  }),
);

const Wrapper = styled.div({
  backgroundColor: 'blue',
  flexGrow: 1,
  height: '250px',
  padding: '10px',
});

const PassCards = () => {
  const io = useWebSocketContext();
  const { freeDefenseCardCount, isDefender, table } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const canDrop = card => {
    if (!isDefender) return false;
    // TODO: allow player to throw multiple cards at once
    if (freeDefenseCardCount < 1) return false;

    return canPass({ card, table });
  };

  const drop = item => {
    io.send('passed', {
      card: { rank: item.rank, suit: item.suit },
    });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
  });

  return <Wrapper className="PassCards" isOver={isOver} ref={dropRef} />;
};

export default PassCards;
