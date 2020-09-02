import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import last from 'lodash/last';

import actions from 'actions';

const getLastMessage = ({ messages }) => last(messages);

const WebSocketEventListener = () => {
  const dispatch = useDispatch();
  const lastMessage = useSelector(getLastMessage);

  useEffect(() => {
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'restarted':
        setTimeout(() => {
          dispatch(actions.game.remoteDataState.set('NOT_FETCHED'));
        }, 1000);
        break;
      default:
    }
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
