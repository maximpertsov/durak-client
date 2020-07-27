import React from 'react';
import styled from '@emotion/styled';
import flatMap from 'lodash/flatMap';

import Card from './components/Card';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 120px)',
  gridGap: '0.25rem',
});

const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const ranks = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
];
const cards = flatMap(suits, suit => ranks.map(rank => ({ rank, suit })));

const Game = () => {
  const renderCards = () => cards.map(card => {
    const { suit, rank } = card;

    return <Card suit={suit} rank={rank} />;
  });

  return <Wrapper className="Game">{renderCards()}</Wrapper>;
};

export default Game;
