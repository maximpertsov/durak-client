import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { getAttackers } from 'reducers';
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
  state => getAttackers(state),
  (_, props) => props.player,
  (state, props) => state.hands[props.player],

  (state, attackers, player, cards) => ({
    isInitialAttacker: fp.first(attackers) === player,
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
  }),
);

const Player = ({ player }) => {
  const { cardCount, displayCards, isInitialAttacker } = useSelector(
    state => mapStateToProps(state, { player }),
    fp.isEqual,
  );

  if (!player) return <div />;

  return (
    <div className="Player">
      <h2>{`${player} ${isInitialAttacker ? '*' : ''}`}</h2>
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
