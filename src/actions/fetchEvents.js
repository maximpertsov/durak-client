import actions from 'actions';
import client from 'utils/client';

const fetchEvents = () => async dispatch => {
  let events = [];

  await client.get('game/abc123/events').then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHING_EVENTS'));

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
  }, 0);
};

export default fetchEvents;
