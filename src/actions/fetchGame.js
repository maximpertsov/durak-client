import actions from 'actions';
import client from 'utils/client';

const fetchGame = ({ game }) => dispatch => {
  if (!game) return;

  dispatch(actions.game.remoteDataState.set('FETCHING_GAME'));

  client.get(`game/${game}`).then(response => {
    // TODO: simplify payload coming from server
    const {
      data: {
        players,
        seed,
        variant: { lowestRank, attackLimit, withPassing },
      },
    } = response;

    // TODO: make messages the source of truth for states
    dispatch(
      actions.messages.append({
        type: 'initialized',
        toState: {
          collector: null,
          drawnCards: [],
          durak: null,
          seed,
          players,
          passCount: 0,
          table: [],
          yielded: [],
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
