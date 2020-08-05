import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import last from 'lodash/last';

import handleWebSocketEvent from 'actions/handleWebSocketEvent';

const getLastMessage = ({ messages }) => last(messages);

const WebSocketEventListener = () => {
  const dispatch = useDispatch();
  const lastMessage = useSelector(getLastMessage);

  useEffect(() => {
    if (!lastMessage) return;

    dispatch(handleWebSocketEvent(lastMessage));
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
