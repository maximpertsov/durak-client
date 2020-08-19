import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';

import actions from 'actions';

import getCardImage, { getBackOfCard } from './images';

const mapStateToProps = createSelector(
  (state) => state,
  (_, props) => props.rank,
  (_, props) => props.suit,

  (state, rank, suit) => ({
    hand: state.hands[state.user],
    selectedCard: find(state.selectedCards, { suit, rank }),
    trumpSuit: state.trumpSuit,
  }),
);

const topAdjust = '156.67%'

const SelectionIndicator = styled.div({
  backgroundColor: 'rgba(30,179,0,0.3)',
  height: '100%',
  marginTop: `-${topAdjust}`,
  position: 'absolute',
  width: '100%',
  zIndex: '1',
});

const Wrapper = styled.div(({ isDragging, flipped, rank, suit, trumpSuit }) => {
  const cardImage = flipped ? getBackOfCard() : getCardImage({ rank, suit });
  const isGlowing = !flipped && trumpSuit === suit;

  const glow = keyframes({
    '0%': {
      boxShadow: '0 0 20px #d35400',
    },
    '100%': {
      boxShadow: '0 0 10px #d35400',
    },
  });

  return {
    animation: isGlowing ? `${glow} 1s ease alternate infinite` : null,
    backgroundImage: `url(${cardImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '5px',
    height: '0%',
    opacity: isDragging ? '30%' : '100%',
    paddingTop: topAdjust,
    position: 'relative',
  };
});

const Card = ({ suit, rank, flipped }) => {
  const dispatch = useDispatch();
  const { hand, selectedCard, trumpSuit } = useSelector(
    (state) => mapStateToProps(state, { rank, suit }),
    isEqual,
  );

  const canDrag = () => some(hand, { suit, rank });

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', suit, rank },
    canDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const onClick = () => {
    if (!selectedCard) {
      dispatch(actions.game.selectedCards.add({ suit, rank }));
      return;
    }
    dispatch(actions.game.selectedCards.remove(selectedCard));
  };

  return (
    <Wrapper
      className="Card"
      onClick={onClick}
      isDragging={isDragging}
      flipped={flipped}
      suit={suit}
      trumpSuit={trumpSuit}
      rank={rank}
      ref={dragRef}
    >
      {!!selectedCard && <SelectionIndicator />}
    </Wrapper>
  );
};

export default Card;
