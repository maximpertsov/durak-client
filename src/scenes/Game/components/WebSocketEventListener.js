import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import last from 'lodash/last';

import actions from 'actions';

const getLastMessage = ({ messages }) => last(messages);

const updateGameState = (dispatch, message) => {
  const {
    toState: { drawPile, hands, passCount, table, trumpSuit, yielded },
  } = message;

  dispatch(actions.game.drawPile.set(drawPile));
  dispatch(actions.game.hands.set(hands));
  dispatch(actions.game.passCount.set(passCount));
  dispatch(actions.game.table.set(table));
  dispatch(actions.game.trumpSuit.set(trumpSuit));
  dispatch(actions.game.yielded.set(yielded));
};

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
        updateGameState(dispatch, lastMessage);
    }
  }, [dispatch, lastMessage]);

  return null;
};

export default WebSocketEventListener;
