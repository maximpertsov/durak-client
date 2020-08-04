import actions from 'actions';
import client from 'utils/client';

const fetchGame = () => dispatch => {
  client.get('game/abc123').then(response => {
    const {
      data: { drawPile, players },
    } = response;

    dispatch(actions.game.players.set(players));
    dispatch(actions.game.drawPile.set(drawPile));
  });
};

export default fetchGame;
