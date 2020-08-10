import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';

import getCardImage, { getBackOfCard } from './images';

const Wrapper = styled.div(({ isDragging, flipped, rank, suit, trumpSuit }) => {
  const cardImage = flipped ? getBackOfCard() : getCardImage({ rank, suit });
  const isGlowing = !flipped && trumpSuit === suit;

  const glow = keyframes({
    '0%': {
      boxShadow: '0 0 15px #d35400',
    },
    '100%': {
      boxShadow: '0 0 0 0',
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
    paddingTop: '156.67%',
  };
});

const mapStateToProps = createSelector(
  state => state,

  state => ({
    hand: state.hands[state.user],
    trumpSuit: state.trumpSuit,
  }),
);

const Card = ({ suit, rank, flipped }) => {
  const { hand, trumpSuit } = useSelector(mapStateToProps, isEqual);

  const canDrag = () => some(hand, { suit, rank });

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', suit, rank },
    canDrag,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Wrapper
      className="Card"
      isDragging={isDragging}
      flipped={flipped}
      suit={suit}
      trumpSuit={trumpSuit}
      rank={rank}
      ref={dragRef}
    />
  );
};

export default Card;
