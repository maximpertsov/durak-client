import React from 'react';
import styled from '@emotion/styled';

import Card from './Card';
import CardStack from './CardStack';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 60px)',
  gridGap: '0.25em',
  justifyContent: 'center',
  margin: '0 auto',
  padding: '0 5%',
});

const CardOrStack = ({ cardOrStack }) => {
  if (Array.isArray(cardOrStack)) {
    return (
      <CardStack>
        {cardOrStack.map((card, index) => (
          <CardOrStack key={index} cardOrStack={card} />
        ))}
      </CardStack>
    );
  }

  const { suit, rank } = cardOrStack || {};
  return <Card suit={suit} rank={rank} />;
};

const Cards = ({ cards }) => {
  const renderCards = () => cards.map((cardOrStack, index) => (
    <CardOrStack key={index} cardOrStack={cardOrStack} />
  ));

  return <Wrapper className="Game">{renderCards()}</Wrapper>;
};

export default Cards;
