import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import Card from './components/Card';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 120px)',
  gridGap: '0.25rem',
});

const Game = () => {
  const cards = useSelector(state => state.hand, isEqual);

  const renderCards = () => cards.map(card => {
    const { suit, rank } = card;

    return <Card suit={suit} rank={rank} />;
  });

  return <Wrapper className="Game">{renderCards()}</Wrapper>;
};

export default Game;
