import fromPairs from 'lodash/fromPairs';
import last from 'lodash/last';
import map from 'lodash/map';

import actions from 'actions';
import client from 'utils/client';
import { getSuit } from 'utils/gameLogic';

const fetchGame = ({ game }) => dispatch => {
  if (!game) return;

  dispatch(actions.game.remoteDataState.set('FETCHING_GAME'));

  client.get(`game/${game}`).then(response => {
    // TODO: simplify payload coming from server
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

    // setup draw pile & trump suit
    dispatch(actions.game.drawPile.set(drawPile));
    const trumpSuit = getSuit(last(drawPile));
    dispatch(actions.game.trumpSuit.set(trumpSuit));

    // clear player hands (applies if this is a restart)
    const clearHands = fromPairs(players.map(player => [player, []]));
    dispatch(actions.game.hands.set(clearHands));

    dispatch(actions.game.remoteDataState.set('FETCHED_GAME'));
  });
};

export default fetchGame;
