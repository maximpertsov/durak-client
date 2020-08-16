import actions from 'actions';
import client from 'utils/client';

const fetchEvents = ({ game }) => async dispatch => {
  if (!game) return;

  let events;

  await client.get(`game/${game}/events`).then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHING_EVENTS'));

    // TODO: maybe this should be done server-side?
    events = response.data.events.reverse();

    dispatch(actions.game.remoteDataState.set('FETCHED_EVENTS'));
  });

  const timerId = setInterval(() => {
    const event = events.pop();
    if (!event) {
      clearInterval(timerId);
      dispatch(actions.game.remoteDataState.set('REPLAYED_EVENTS'));
      return;
    }
    dispatch(actions.messages.append(event));
  }, 10);
};

export default fetchEvents;
