import compact from 'lodash/compact';
import drop from 'lodash/drop';
import take from 'lodash/take';

import actions from 'actions';

const handSize = 6;

const draw = ({ drawPile, hands, player }) => dispatch => {
  const cardsNeeded = Math.max(handSize - compact(hands[player]).length, 0);
  const drawnCards = take(drawPile, cardsNeeded);
  const cardsLeftInPile = drop(drawPile, cardsNeeded);

  dispatch(actions.game.hands.add({ cards: drawnCards, player }));
  dispatch(actions.game.drawPile.set(cardsLeftInPile));
};

export default draw;
