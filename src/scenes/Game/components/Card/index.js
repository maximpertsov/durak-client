import React from 'react';
import { useDrag } from 'react-dnd';
import styled from '@emotion/styled';

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
    paddingTop: '157%',
  };
});

const Card = ({ suit, rank }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'CARD', suit, rank },
    begin: () => {},
    end: () => {},
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
