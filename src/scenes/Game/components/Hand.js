import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    cards: state.hands[state.user],
  }),
);

const Hand = () => {
  const { cards } = useSelector(mapStateToProps, isEqual);

  return (
    <div className="Hand">
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
