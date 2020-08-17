import actions from 'actions';
import client from 'utils/client';

const fetchEvents = ({ game }) => async dispatch => {
  if (!game) return;

  await client.get(`game/${game}/events`).then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHED_EVENTS'));
    response.data.events.forEach(event => {
      dispatch(actions.messages.append(event));
    });
    dispatch(actions.game.remoteDataState.set('REPLAYED_EVENTS'));
  });
};

export default fetchEvents;
