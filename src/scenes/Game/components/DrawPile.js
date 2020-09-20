import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import compact from 'lodash/compact';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import { getDrawPile, getTrumpSuit } from 'reducers';
import { Emoji } from 'styles';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => getDrawPile(state),
  state => size(getDrawPile(state)),
  state => getTrumpSuit(state),

  (drawPile, cardsLeft, trumpSuit) => ({
    nextCard: cardsLeft > 1 ? { flipped: true } : null,
    lastCard: cardsLeft > 0 ? { card: last(drawPile) } : null,
    displayText: `${cardsLeft} left`,
    trumpText: trumpSuit && `trump: ${get(Emoji, trumpSuit.toUpperCase())}`,
  }),
);

const DrawPile = () => {
  const { nextCard, lastCard, displayText, trumpText } = useSelector(
    mapStateToProps,
    isEqual,
  );

  return (
    <div className="DrawPile">
      {lastCard && <Cards cards={[compact([lastCard, nextCard])]} />}
      <div>{displayText}</div>
      <div>{trumpText}</div>
    </div>
  );
};

export default DrawPile;
