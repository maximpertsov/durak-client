import React from 'react';
import styled from '@emotion/styled';

import { players } from 'reducers/hands';

import Hand from './components/Hand';
import Player from './components/Player';
import Table from './components/Table';
import WebSocketEventListener from './components/WebSocketEventListener';

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
  <div className="Game">
    <WebSocketEventListener />
    <Table />
    <Hand />
  </div>
);

export default Game;
