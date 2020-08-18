import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { getDefender } from 'reducers';
import fp from 'utils/lodashFp';

import Cards from './Cards';

const getCardCount = fp.flow(fp.compact, fp.size);
const getDisplayCards = fp.flow(
  fp.compact,
  fp.chunk(6),
  fp.unzip,
  fp.map(fp.compact),
);

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

const Player = ({ player }) => {
  const { cardCount, displayCards, isDefender } = useSelector(
    state => mapStateToProps(state, { player }),
    fp.isEqual,
  );

  if (!player) return <div />;

  return (
    <div className="Player">
      <h2>{`${player}${isDefender ? String.fromCodePoint(0x1f6e1) : ''}`}</h2>
      <Cards flipped cards={displayCards} />
      <div>{`${cardCount} cards`}</div>
      <div />
    </div>
  );
};

export default Player;

Player.propTypes = {
  player: PropTypes.string,
};

Player.defaultProps = {
  player: null,
};
