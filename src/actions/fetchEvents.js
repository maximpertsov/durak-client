import actions from 'actions';
import handleWebSocketEvent from 'actions/handleWebSocketEvent';
import client from 'utils/client';

const fetchEvents = () => dispatch => {
  client.get('game/abc123/events').then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHING_EVENTS'));

    response.data.events.forEach(event => {
      dispatch(handleWebSocketEvent(event));
    });

    dispatch(actions.game.remoteDataState.set('FETCHED_EVENTS'));
  });
};

export default fetchEvents;
