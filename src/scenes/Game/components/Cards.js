import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { MediaQuery } from 'styles';

import Card from './Card';
import CardStack from './CardStack';

const Wrapper = styled.div(props => {
  const scaleFactor = props.scale ? props.scale : 1.0;
  const getGridTemplateColumns = ({ basePixelWidth }) =>
    `repeat(auto-fit, ${scaleFactor * basePixelWidth}px)`;

  return {
    [MediaQuery.NARROW]: {
      gridTemplateColumns: getGridTemplateColumns({ basePixelWidth: 40 }),
    },
    [MediaQuery.WIDE]: {
      gridTemplateColumns: getGridTemplateColumns({ basePixelWidth: 60 }),
    },
    display: 'grid',
    gridGap: '0.25em',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '0 5%',
  };
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

  const { card, flipped } = cardOrStack || {};
  return <Card card={card} flipped={flipped} />;
};

CardOrStack.propTypes = {
  cardOrStack: PropTypes.oneOfType([
    PropTypes.shape(Card.propTypes),
    PropTypes.arrayOf(PropTypes.shape(Card.propTypes)),
  ]).isRequired,
};

const Cards = ({ cards, scale }) => {
  const renderCards = () =>
    cards.map((cardOrStack, index) => (
      <CardOrStack key={index} cardOrStack={cardOrStack} />
    ));

  return (
    <Wrapper scale={scale} className="Game">
      {renderCards()}
    </Wrapper>
  );
};

export default Cards;

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(Card.propTypes),
      PropTypes.arrayOf(PropTypes.shape(Card.propTypes)),
    ]),
  ),
  scale: PropTypes.number,
};

Cards.defaultProps = {
  cards: [],
  scale: 1.0,
};
