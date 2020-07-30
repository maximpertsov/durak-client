import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getLastMessage } from 'reducers';

const WebSocketEventListener = () => {
  const lastMessage = useSelector(getLastMessage, isEqual);

  useEffect(() => {
    if (!lastMessage) return;

    console.log(`received message: ${JSON.stringify(lastMessage)}`);
  }, [lastMessage]);

  return null;
};

export default WebSocketEventListener;
