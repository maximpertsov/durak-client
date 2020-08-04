import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import last from 'lodash/last';

import attack from 'actions/attack';
import defend from 'actions/defend';
import draw from 'actions/draw';
import fetchGame from 'actions/fetchGame';
import yieldAttack from 'actions/yieldAttack';
// import client from 'utils/client';

const eventActions = {
  attacked: attack,
  defended: defend,
  draw_cards: draw,
  yielded_attack: yieldAttack,
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
    dispatch(fetchGame());
  }, [dispatch]);

  useEffect(() => {
    if (!lastMessage) return;

    dispatchEventAction(dispatch, lastMessage);
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
