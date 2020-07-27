import React from 'react';
import styled from '@emotion/styled';

import getCardImage from './images';

const Wrapper = styled.div(props => {
  const cardImage = getCardImage(props);

  return {
    backgroundImage: `url(${cardImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'center',
    height: '0%',
    paddingTop: '125%',
  };
});

const Card = ({ suit, rank }) => (
  <Wrapper suit={suit} rank={rank}>
    <div className="Card" />
  </Wrapper>
);

export default Card;
