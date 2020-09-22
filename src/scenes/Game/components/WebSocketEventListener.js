import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import last from 'lodash/last';

import actions from 'actions';

const getLastMessage = ({ messages }) => last(messages);

const WebSocketEventListener = ({ history }) => {
  const dispatch = useDispatch();
  const lastMessage = useSelector(getLastMessage);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user) return;
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'restarted':
        // TODO: define a compound action?
        dispatch(actions.messages.clear());
        dispatch(actions.game.remoteDataState.set('NOT_FETCHED'));
        history.push(`/${lastMessage.payload.game}`);
        break;
      case 'updated_game_requests':
        dispatch(actions.home.gameList.set(null));
        dispatch(actions.home.gameRequests.set(null));
        break;
      default:
    }
  }, [dispatch, history, lastMessage, user]);

  return null;
};

export default withRouter(WebSocketEventListener);
