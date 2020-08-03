import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';
import YieldButton from './YieldButton';

const mapStateToProps = createSelector(
  state => state,
  state => state.username,

  (state, username) => ({
    cards: state.hands[username],
    username,
  }),
);

const Hand = () => {
  const { cards, username } = useSelector(mapStateToProps, isEqual);

  return (
    <div className="Hand">
      <YieldButton />
      <h2>{username}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
