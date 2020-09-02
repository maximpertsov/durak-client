import map from 'lodash/map';

import actions from 'actions';
import client from 'utils/client';

const fetchGame = ({ game }) => dispatch => {
  if (!game) return;

  dispatch(actions.game.remoteDataState.set('FETCHING_GAME'));

  client.get(`game/${game}`).then(response => {
    // TODO: simplify payload coming from server
    const {
      data: { drawPile, hands, players, trumpSuit },
    } = response;

    // setup data provided by server
    dispatch(actions.game.players.set(players));
    dispatch(actions.game.drawPile.set(map(drawPile, 'card')));
    dispatch(actions.game.trumpSuit.set(trumpSuit));
    dispatch(actions.game.hands.set(hands));

    // clear draws
    dispatch(actions.game.passCount.set(0));
    // clear table
    dispatch(actions.game.table.clear());

    dispatch(actions.game.remoteDataState.set('FETCHED_GAME'));
  });
};

export default fetchGame;
