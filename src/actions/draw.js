import compact from 'lodash/compact';
import concat from 'lodash/concat';
import drop from 'lodash/drop';
import first from 'lodash/first';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';
import size from 'lodash/size';
import take from 'lodash/take';
import update from 'lodash/update';

import actions from 'actions';

const handSize = 6;

const drawPlayer = ({ drawPile, hands, player }) => {
  update(hands, player, compact);

  const cardsNeeded = Math.max(handSize - size(get(hands, player)), 0);
  const drawnCards = take(drawPile, cardsNeeded);
  const cardsLeftInPile = drop(drawPile, cardsNeeded);

  update(hands, player, hand => concat(drawnCards, hand));
  drawPile.push(...cardsLeftInPile);
};

const rotate = ({ hands, players, rotations }) => {
  while (rotations > 0) {
    players.push(players.shift());

    if (!isEmpty(get(hands, first(players)))) {
      rotations--;
    }
  }
};

const draw = ({ drawPile, hands, players, rotations }) => dispatch => {
  // all players collect cards
  players.forEach(player => {
    drawPlayer({ drawPile, hands, player });
  });

  // rotate players
  rotate({ hands, players, rotations });

  // set everything via action
  dispatch(actions.game.drawPile.set(drawPile));
  dispatch(actions.game.hand.set(hands));
  dispatch(actions.game.players.set(players));
  dispatch(actions.game.rotations.set.zero());
};

export default draw;
