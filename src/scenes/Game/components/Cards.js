import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Card from './Card';
import CardStack from './CardStack';

const BASE_CARD_WIDTH_PIXELS = 60;

const Wrapper = styled.div(props => {
  const scaleFactor = props.scale ? props.scale : 1.0;
  const cardWidthInPixels = scaleFactor * BASE_CARD_WIDTH_PIXELS;

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, ${cardWidthInPixels}px)`,
    gridGap: '0.25em',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '0 5%',
  };
});

const CardOrStack = ({ flipped, cardOrStack }) => {
  if (Array.isArray(cardOrStack)) {
    return (
      <CardStack>
        {cardOrStack.map((card, index) => (
          <CardOrStack key={index} flipped={flipped} cardOrStack={card} />
        ))}
      </CardStack>
    );
  }

  const { flipped: cardFlipped, suit, rank } = cardOrStack || {};
  return <Card flipped={flipped || cardFlipped} suit={suit} rank={rank} />;
};

const Cards = ({ cards, flipped, scale }) => {
  const renderCards = () =>
    cards.map((cardOrStack, index) => (
      <CardOrStack key={index} flipped={flipped} cardOrStack={cardOrStack} />
    ));

  return (
    <Wrapper scale={scale} className="Game">
      {renderCards()}
    </Wrapper>
  );
};

export default Cards;

Cards.propTypes = {
  flipped: PropTypes.bool,
  cards: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
  ]),
};

Cards.defaultProps = {
  flipped: false,
  cards: [],
};
