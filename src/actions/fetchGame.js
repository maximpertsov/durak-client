import drop from 'lodash/drop';
import fromPairs from 'lodash/fromPairs';
import last from 'lodash/last';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import take from 'lodash/take';

import actions from 'actions';
import client from 'utils/client';
import { getSuit } from 'utils/gameLogic';

const handSize = 6;

const fetchGame = ({ game }) => dispatch => {
  if (!game) return;

  dispatch(actions.game.remoteDataState.set('FETCHING_GAME'));

  client.get(`game/${game}`).then(response => {
    const {
      data: { drawPile: drawPileData, players },
    } = response;
    const drawPile = map(drawPileData, 'card');

    // clear draws
    dispatch(actions.game.passCount.set(0));

    // clear table
    dispatch(actions.game.table.clear());

    // setup players
    dispatch(actions.game.players.set(players));

    // setup draw pile
    const cardsLeft = drop(drawPile, players.length * handSize);
    dispatch(actions.game.drawPile.set(cardsLeft));
    const trumpSuit = getSuit(last(drawPile));
    dispatch(actions.game.trumpSuit.set(trumpSuit));

    // clear player hands (applies if this is a restart)
    const clearHands = fromPairs(players.map(player => [player, []]));
    dispatch(actions.game.hands.set(clearHands));

    // setup player hands (round-robin)
    const cardsToDraw = reverse(take(drawPile, players.length * handSize));
    while (cardsToDraw.length > 0) {
      players.forEach(player => {
        const card = cardsToDraw.pop();
        dispatch(actions.game.hands.add({ cards: [card], player }));
      });
    }

    dispatch(actions.game.remoteDataState.set('FETCHED_GAME'));
  });
};

export default fetchGame;
