import actions from 'actions';
import client from 'utils/client';

const fetchGame = ({ game }) => dispatch => {
  if (!game) return;

  dispatch(actions.game.remoteDataState.set('FETCHING_GAME'));

  client.get(`game/${game}`).then(response => {
    const {
      data: {
        players,
        seed,
        variant: { lowestRank, attackLimit, withPassing },
      },
    } = response;

    dispatch(
      actions.messages.append({
        type: 'initialized',
        toState: {
          seed,
          players: players.map(player => ({
            id: player,
          })),
          lowestRank,
          attackLimit,
          withPassing,
        },
      }),
    );

    dispatch(actions.game.remoteDataState.set('FETCHED_GAME'));
  });
};

export default fetchGame;
