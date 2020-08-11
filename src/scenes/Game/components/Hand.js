import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { getAttackers } from 'reducers';
import fp from 'utils/lodashFp';

import Cards from './Cards';
import CollectButton from './CollectButton';
import YieldButton from './YieldButton';

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),

  (state, attackers) => ({
    cards: state.hands[state.user],
    isInitialAttacker: fp.first(attackers) === state.user,
    user: state.user,
  }),
);

const Hand = () => {
  const { cards, isInitialAttacker, user } = useSelector(
    mapStateToProps,
    fp.isEqual,
  );

  return (
    <div className="Hand">
      <YieldButton />
      <CollectButton />
      <h2>{`${user} ${isInitialAttacker ? '*' : ''}`}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
