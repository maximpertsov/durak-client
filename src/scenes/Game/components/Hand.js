import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { getHands } from 'reducers';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    cards: get(getHands(state), state.user, []).map(card => ({ card })),
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
