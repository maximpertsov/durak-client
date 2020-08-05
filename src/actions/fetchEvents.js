import actions from 'actions';
import client from 'utils/client';

const fetchEvents = io => dispatch => {
  client.get('game/abc123/events').then(response => {
    dispatch(actions.game.remoteDataState.set('FETCHING_EVENTS'));

    response.data.events.forEach(event => {
      console.log(`received event ${JSON.stringify(event)}`);
      // io.sendRaw(event);
    });

    dispatch(actions.game.remoteDataState.set('FETCHED_EVENTS'));
  });
};

export default fetchEvents;
