import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Card from './Card';
import CardStack from './CardStack';

const Wrapper = styled.div(props => {
  const scaleFactor = props.scale ? props.scale : 1.0;
  const getGridTemplateColumns = ({ basePixelWidth }) =>
    `repeat(auto-fit, ${scaleFactor * basePixelWidth}px)`;

  /* eslint-disable quote-props */
  return {
    '@media (max-width: 720px)': {
      gridTemplateColumns: getGridTemplateColumns({ basePixelWidth: 40 }),
    },
    '@media (min-width: 720px)': {
      gridTemplateColumns: getGridTemplateColumns({ basePixelWidth: 60 }),
    },
    display: 'grid',
    gridGap: '0.25em',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '0 5%',
  };
  /* eslint-enable quote-props */
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

  const { flipped, suit, rank } = cardOrStack || {};
  return <Card flipped={flipped} suit={suit} rank={rank} />;
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
  cards: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
  ]),
  scale: PropTypes.number,
};

Cards.defaultProps = {
  cards: [],
  scale: 1.0,
};
