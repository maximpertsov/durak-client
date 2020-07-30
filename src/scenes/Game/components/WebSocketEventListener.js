import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import attack from 'actions/attack';
import defend from 'actions/defend';
import { getLastMessage } from 'reducers';

const eventActions = {
  ATTACKED: attack,
  DEFENDED: defend,
};

const dispatchEventAction = (dispatch, message) => {
  const action = get(eventActions, message.type);
  if (!action) {
    console.log(`cannot process message type: ${message.type}`);
    return;
  }
  dispatch(action(message.payload));
};

const WebSocketEventListener = () => {
  const dispatch = useDispatch();
  const lastMessage = useSelector(getLastMessage, isEqual);

  useEffect(() => {
    if (!lastMessage) return;

    console.log(`received message: ${JSON.stringify(lastMessage)}`);
    dispatchEventAction(dispatch, lastMessage);
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
