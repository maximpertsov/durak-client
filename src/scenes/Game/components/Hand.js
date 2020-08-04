import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';
import SuccessfulDefenseListener from './SuccessfulDefenseListener';
import YieldButton from './YieldButton';

const mapStateToProps = createSelector(
  state => state,
  state => state.user,

  (state, user) => ({
    cards: state.hands[user],
    user,
  }),
);

const Hand = () => {
  const { cards, user } = useSelector(mapStateToProps, isEqual);

  return (
    <div className="Hand">
      <SuccessfulDefenseListener />
      <YieldButton />
      <h2>{user}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
