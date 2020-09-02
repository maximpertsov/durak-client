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

    // TODO: make messages the source of truth for states
    dispatch(
      actions.messages.append({
        type: 'initialized',
        toState: {
          drawPile: map(drawPile, 'card'),
          hands,
          players,
          passCount: 0,
          table: [],
          trumpSuit,
          yielded: [],
        },
      }),
    );

    // clear table
    dispatch(actions.game.table.clear());

    dispatch(actions.game.remoteDataState.set('FETCHED_GAME'));
  });
};

export default fetchGame;
