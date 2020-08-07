import drop from 'lodash/drop';
import reverse from 'lodash/reverse';
import take from 'lodash/take';

import actions from 'actions';
import client from 'utils/client';

const handSize = 6;

const fetchGame = ({ game }) => dispatch => {
  if (!game) return;

  dispatch(actions.game.remoteDataState.set('FETCHING_GAME'));

  client.get(`game/${game}`).then(response => {
    const {
      data: { drawPile, players },
    } = response;

    // setup players
    dispatch(actions.game.players.set(players));

    // setup draw pile
    const cardsLeft = drop(drawPile, players.length * handSize);
    dispatch(actions.game.drawPile.set(cardsLeft));

    // setup player hands (round-robin)
    const cardsToDraw = reverse(take(drawPile, players.length * handSize));
    while (cardsToDraw.length > 0) {
      players.forEach(player => {
        const card = cardsToDraw.pop();
        dispatch(actions.game.hand.add({ cards: [card], player }));
      });
    }

    dispatch(actions.game.remoteDataState.set('FETCHED_GAME'));
  });
};

export default fetchGame;
