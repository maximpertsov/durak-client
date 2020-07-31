import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';

import getCardImage from './images';

const Wrapper = styled.div(props => {
  const { isDragging, rank, suit } = props;
  const cardImage = getCardImage({ rank, suit });

  return {
    backgroundImage: `url(${cardImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '0%',
    opacity: isDragging ? '30%' : '100%',
    paddingTop: '156.67%',
  };
});

const Card = ({ suit, rank }) => {
  const username = useSelector(state => state.username, isEqual);
  const hand = useSelector(state => state.hands[username], isEqual);

  const canDrag = () => some(hand, { suit, rank });

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', suit, rank, player: username },
    canDrag,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Wrapper
      className="Card"
      isDragging={isDragging}
      suit={suit}
      rank={rank}
      ref={dragRef}
    />
  );
};

export default Card;
