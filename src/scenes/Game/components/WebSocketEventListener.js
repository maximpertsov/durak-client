import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import last from 'lodash/last';

import attack from 'actions/attack';
import defend from 'actions/defend';
import joinGame from 'actions/joinGame';

const eventActions = {
  joined_game: joinGame,
  attacked: attack,
  defended: defend,
};

const dispatchEventAction = (dispatch, message) => {
  const action = get(eventActions, message.type);
  if (!action) {
    return;
  }
  dispatch(action(message.payload));
};

const getLastMessage = ({ messages }) => last(messages);

const WebSocketEventListener = () => {
  const dispatch = useDispatch();
  const lastMessage = useSelector(getLastMessage);

  useEffect(() => {
    if (!lastMessage) return;

    dispatchEventAction(dispatch, lastMessage);
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
