import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import compact from 'lodash/compact';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import { getDrawPile } from 'reducers';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => getDrawPile(state),

  drawPile => ({
    nextCard: size(drawPile) > 1 ? { flipped: true } : null,
    lastCard: size(drawPile) > 0 ? { card: last(drawPile) } : null,
    displayText: `${size(drawPile)} left`,
  }),
);

const DrawPile = () => {
  const { nextCard, lastCard, displayText } = useSelector(
    mapStateToProps,
    isEqual,
  );

  return (
    <div className="DrawPile">
      {lastCard && <Cards cards={[compact([lastCard, nextCard])]} />}
      <div>{displayText}</div>
    </div>
  );
};

export default DrawPile;
