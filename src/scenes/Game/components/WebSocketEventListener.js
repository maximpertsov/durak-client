import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import last from 'lodash/last';

import actions from 'actions';

const getLastMessage = ({ messages }) => last(messages);

const WebSocketEventListener = ({ history }) => {
  const dispatch = useDispatch();
  const lastMessage = useSelector(getLastMessage);

  useEffect(() => {
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'restarted':
        // TODO: define a compound action?
        dispatch(actions.messages.clear());
        dispatch(actions.game.remoteDataState.set('NOT_FETCHED'));
        history.push(`/${lastMessage.payload.game}`);
        break;
      default:
    }
  }, [dispatch, history, lastMessage]);

  return null;
};

export default withRouter(WebSocketEventListener);
