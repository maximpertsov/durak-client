import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { getAttackers, getDefender } from 'reducers';
import fp from 'utils/lodashFp';

import Cards from './Cards';
import CollectButton from './CollectButton';
import YieldButton from './YieldButton';

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),

  (state, attackers) => ({
    cards: state.hands[state.user],
    isDefender: getDefender(state) === state.user,
    isInitialAttacker: fp.first(attackers) === state.user,
    isInGame: state.players.includes(state.user),
    user: state.user,
  }),
);

const Hand = () => {
  const { cards, isDefender, isInitialAttacker, isInGame, user } = useSelector(
    mapStateToProps,
    fp.isEqual,
  );

  const dagger = String.fromCodePoint(0x1f5e1);
  const shield = String.fromCodePoint(0x1f6e1);
  const popcorn = String.fromCodePoint(0x1f37f);

  return (
    <div className="Hand">
      <YieldButton />
      <CollectButton />
      {!isInGame && (
        <h2>{`${`${popcorn} Relax, you're not the durak! ${popcorn}`}`}</h2>
      )}
      {isInitialAttacker && (
        <h2>{`${`${dagger} You are attacking ${dagger}`}`}</h2>
      )}
      {isDefender && <h2>{`${`${shield} You are defending ${shield}`}`}</h2>}
      <h2>{user}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
