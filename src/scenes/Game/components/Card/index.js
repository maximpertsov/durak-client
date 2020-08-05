import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';

import getCardImage, { getBackOfCard } from './images';

const Wrapper = styled.div(props => {
  const { isDragging, flipped, rank, suit } = props;
  const cardImage = flipped ? getBackOfCard() : getCardImage({ rank, suit });

  return {
    backgroundImage: `url(${cardImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '0%',
    opacity: isDragging ? '30%' : '100%',
    paddingTop: '156.67%',
  };
});

const Card = ({ suit, rank, flipped }) => {
  const user = useSelector(state => state.user, isEqual);
  const hand = useSelector(state => state.hands[user], isEqual);

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
      rank={rank}
      ref={dragRef}
    />
  );
};

export default Card;
