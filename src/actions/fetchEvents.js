import actions from 'actions';
import { dispatchEventAction } from 'scenes/Game/components/WebSocketEventListener';
import client from 'utils/client';

const fetchEvents = () => dispatch => {
  client.get('game/abc123/events').then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHING_EVENTS'));

    response.data.events.forEach(event => {
      dispatchEventAction(dispatch, event);
    });

    dispatch(actions.game.remoteDataState.set('FETCHED_EVENTS'));
  });
};

export default fetchEvents;
