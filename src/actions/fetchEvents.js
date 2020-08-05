import actions from 'actions';
import handleWebSocketEvent from 'actions/handleWebSocketEvent';
import client from 'utils/client';

const fetchEvents = () => dispatch => {
  let events = [];

  client.get('game/abc123/events').then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHING_EVENTS'));

    events = response.data.events.reverse();

    dispatch(actions.game.remoteDataState.set('FETCHED_EVENTS'));
  });

  const timerId = setInterval(() => {
    const event = events.pop();
    if (!event) {
      clearInterval(timerId);
      return;
    }
    dispatch(handleWebSocketEvent(event));
    dispatch(actions.messages.append({sse: true, ...event}));
  }, 200);
};

export default fetchEvents;
