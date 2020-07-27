import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';

import getCardImage from './images';

const Wrapper = styled.div(props => {
  const { opacity, rank, suit } = props;
  const cardImage = getCardImage({ rank, suit });

  return {
    backgroundImage: `url(${cardImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '0%',
    opacity,
    paddingTop: '155.67%',
  };
});

const Card = ({ suit, rank }) => {
  const hand = useSelector(state => state.hand, isEqual);

  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'CARD', suit, rank },
    canDrag: () => some(hand, { suit, rank }),
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <Wrapper
      className="Card"
      opacity={opacity}
      suit={suit}
      rank={rank}
      ref={dragRef}
    />
  );
};

export default Card;
