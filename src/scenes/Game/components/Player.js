import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import size from 'lodash/fp/size';
import unzip from 'lodash/fp/unzip';

import { getDefender } from 'reducers';

import Cards from './Cards';

const getCardCount = flow(compact, size);
const getDisplayCards = flow(compact, chunk(3), unzip, map(compact));

const mapStateToProps = createSelector(
  state => state,
  (_, props) => props.player,
  (state, props) => state.hands[props.player],

  (state, player, cards) => ({
    isDefender: getDefender(state) === player,
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
  }),
);

const Wrapper = styled.div({
  outline: '1px solid grey',
  margin: '10px',
  height: '20vh',
});

const CardsWrapper = styled.div({
  transform: 'scale(0.5)',
  transformOrigin: 'top center',
});

const Player = ({ player }) => {
  const { cardCount, displayCards, isDefender } = useSelector(
    state => mapStateToProps(state, { player }),
    isEqual,
  );

  if (!player) return <Wrapper />;

  return (
    <Wrapper className="Player">
      <h2>{`${player}${isDefender ? String.fromCodePoint(0x1f6e1) : ''}`}</h2>
      <div>{`${cardCount} cards`}</div>
      <CardsWrapper>
        <Cards flipped cards={displayCards} />
      </CardsWrapper>
      <div />
    </Wrapper>
  );
};

export default Player;

Player.propTypes = {
  player: PropTypes.string,
};

Player.defaultProps = {
  player: null,
};
