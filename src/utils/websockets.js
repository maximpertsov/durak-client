import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';

import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import actions from 'actions';
import { deepCamelCase, deepSnakeCase } from 'utils/lodash';

export const WebSocketContext = createContext(null);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const mapStateToProps = createDeepEqualSelector(
  state => state,

  state => ({
    game: state.game,
    user: state.user,
  }),
);

const getGameState = store =>
  pick(store.getState(), [
    'drawPile',
    'hands',
    'passCount',
    'players',
    'table',
    'yielded',
  ]);

/* eslint-disable react/prop-types */
export const WebSocketProvider = ({ children }) => {
  let socket;
  let io;

  const dispatch = useDispatch();
  const { game, user } = useSelector(mapStateToProps, isEqual);
  const store = useStore();

  const createMessage = (type, payload) =>
    deepSnakeCase(
      {
        createdAt: new Date().toISOString(),
        type,
        game,
        user,
        fromState: getGameState(store),
        payload,
      },
      { skipKeys: ['hands'] },
    );

  const send = (type, payload) => {
    if (store.getState().sendInProgress) return;

    dispatch(actions.messages.sendInProgress.set(true));

    const message = createMessage(type, payload);
    socket.send(JSON.stringify(message));

    // TODO: set timeout to revert send in progress if it fails?
    // Set a timeout that checks the message count
  };

  if (!socket) {
    socket = new WebSocket(process.env.REACT_APP_WS_URL);

    socket.onmessage = event => {
      const message = deepCamelCase(JSON.parse(event.data), {
        skipKeys: ['hands'],
      });
      dispatch(actions.messages.append(message));
    };

    io = { socket, send };
  }

  return (
    <WebSocketContext.Provider value={io}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);

export default {};
