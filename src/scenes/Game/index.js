import React from 'react';
import styled from '@emotion/styled';

import { players } from 'reducers/hands';

import Hand from './components/Hand';
import Player from './components/Player';
import Table from './components/Table';

const Wrapper = styled.div({
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '0.25rem',
});
const TopBottomWrapper = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 4,
});

const Game = () => (
  <Wrapper className="Game">
    <TopBottomWrapper>
      <Player player={players[2]} />
    </TopBottomWrapper>
    <Player player={players[1]} />
    <Table />
    <Player player={players[3]} />
    <TopBottomWrapper>
      <Hand />
    </TopBottomWrapper>
  </Wrapper>
);

export default Game;
