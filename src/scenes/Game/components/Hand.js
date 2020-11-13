import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { getHands } from 'reducers';

import Cards from './Cards';
import OrganizeMenu from './OrganizeMenu';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    cards: get(getHands(state), state.user, [])
      .filter(card => card)
      .map(card => ({ card })),
  }),
);

const Hand = () => {
  const { cards } = useSelector(mapStateToProps, isEqual);

  return (
    <div className="Hand">
      <Cards cards={cards} />
      <OrganizeMenu cards={cards} />
    </div>
  );
};

export default Hand;
