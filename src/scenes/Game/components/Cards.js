import React from 'react';
import styled from '@emotion/styled';

import Card from './Card';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 100px)',
  gridGap: '0.25rem',
});

const Cards = ({ cards }) => {
  const renderCards = () => cards.map(card => {
    const { suit, rank } = card;

    return <Card suit={suit} rank={rank} />;
  });

  return <Wrapper className="Game">{renderCards()}</Wrapper>;
};

export default Cards;
