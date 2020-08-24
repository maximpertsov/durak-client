import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import compact from 'lodash/compact';
import first from 'lodash/first';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import actions from 'actions';
import { getAttackers, getDefender, getUnbeatenCards } from 'reducers';
import { canAttack } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

import tenguyscrambled from '../assets/tenguyscrambled.png';
import Cards from './Cards';

/* eslint-disable indent */
const Wrapper = styled.div(props => {
  const noDurakStyle = {
    backgroundColor: 'green',
    height: '25vh',
  };
  const durakAppears = keyframes({
    '0%': noDurakStyle,
    '100%': {
      backgroundImage: `url(${tenguyscrambled})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      height: '50vh',
      zIndex: 2,
    },
  });

  return {
    ...(props.isDurak
      ? {
          animation: `${durakAppears} 1s linear forwards`,
        }
      : noDurakStyle),
    flexGrow: 1,
    margin: '10px',
    opacity: props.isOver ? '90%' : '100%',
    padding: '10px',
  };
});
/* eslint-enable indent */

const getDurak = ({ drawPile, hands }) => {
  if (!isEmpty(drawPile)) return null;

  const playersWithCards = flatMap(hands, (hand, player) => {
    if (isEmpty(compact(hand))) return [];

    return [player];
  });
  if (size(playersWithCards) !== 1) return null;

  return first(playersWithCards);
};

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),
  state => getDefender(state),
  state => getUnbeatenCards(state),

  (state, attackers, defender, unbeatenCards) => ({
    freeDefenseCardCount:
      size(compact(state.hands[defender])) - size(unbeatenCards),
    isDurak: getDurak(state) === state.user,
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
    isDurak,
    selectedCards,
    table,
    userCanAttack,
  } = useSelector(mapStateToProps, isEqual);

  React.useEffect(() => {
    if (isDurak) {
      setTimeout(() => {
        dispatch(actions.game.table.set([]));
      }, 1000);
    }
  }, [dispatch, isDurak]);

  const canDrop = (card, monitor) => {
    if (!monitor.isOver({ shallow: true })) return false;
    if (!userCanAttack) return false;
    if (freeDefenseCardCount < Math.max(1, size(selectedCards))) return false;

    return canAttack({ card, table });
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

  return (
    <Wrapper className="Table" isDurak={isDurak} isOver={isOver} ref={dropRef}>
      <Cards cards={table} />
    </Wrapper>
  );
};

export default Table;
