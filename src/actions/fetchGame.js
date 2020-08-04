import actions from 'actions';
import client from 'utils/client';

const fetchGame = () => dispatch => {
  client.get('game/abc123').then(response => {
    const {
      data: { players },
    } = response;

    dispatch(actions.game.players.set(players));
  });
};

export default fetchGame;
