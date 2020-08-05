import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import first from 'lodash/first';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';
import CollectButton from './CollectButton';
import YieldButton from './YieldButton';

const mapStateToProps = createSelector(
  state => state,
  state => state.user,

  (state, user) => ({
    cards: state.hands[user],
    isInitialAttacker: first(state.players) === user,
    user,
  }),
);

const Hand = () => {
  const { cards, isInitialAttacker, user } = useSelector(
    mapStateToProps,
    isEqual,
  );

  return (
    <div className="Hand">
      <YieldButton />
      <CollectButton />
      <h2>
        {user}
        {isInitialAttacker ? '*' : ''}
      </h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
