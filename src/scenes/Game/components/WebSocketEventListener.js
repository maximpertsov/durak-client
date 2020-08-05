import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import last from 'lodash/last';

import attack from 'actions/attack';
import collect from 'actions/collect';
import defend from 'actions/defend';
import yieldAttack from 'actions/yieldAttack';

const eventActions = {
  attacked: attack,
  collect_cards: collect,
  defended: defend,
  yielded_attack: yieldAttack,
};

export const dispatchEventAction = (dispatch, message) => {
  const action = get(eventActions, message.type);
  if (!action) {
    return;
  }
  dispatch(action({ user: message.user, ...message.payload }));
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
