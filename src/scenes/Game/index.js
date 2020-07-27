import React from 'react';

import Card from './components/Card';

const Game = () => (
  <div className="Game">
    <Card suit="spades" rank="ace" />
    <Card suit="spades" rank="2" />
    <Card suit="spades" rank="3" />
    <Card suit="spades" rank="4" />
    <Card suit="spades" rank="5" />
    <Card suit="spades" rank="6" />
    <Card suit="spades" rank="7" />
    <Card suit="spades" rank="8" />
    <Card suit="spades" rank="9" />
    <Card suit="spades" rank="10" />
    <Card suit="spades" rank="jack" />
    <Card suit="spades" rank="queen" />
    <Card suit="spades" rank="king" />
  </div>
);

export default Game;
