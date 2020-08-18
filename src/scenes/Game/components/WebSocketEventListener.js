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

    const {
      toState: { drawPile, hands, players, table, yielded },
    } = lastMessage;

    dispatch(actions.game.drawPile.set(drawPile));
    dispatch(actions.game.hands.set(hands));
    dispatch(actions.game.players.set(players));
    dispatch(actions.game.table.set(table));
    dispatch(actions.game.yielded.set(yielded));

    dispatch(actions.messages.sendInProgress.set(false));
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
