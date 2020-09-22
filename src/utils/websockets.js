import React, { createContext, useContext } from 'react';
import { useDispatch, useStore } from 'react-redux';

import actions from 'actions';
import { getCurrentState, getGame } from 'reducers';
import { deepCamelCase, deepSnakeCase } from 'utils/lodash';

export const WebSocketContext = createContext(null);

const getGameState = store => {
  const state = store.getState();

  return {
    user: state.user,
    fromState: getCurrentState(state),
  };
};

/* eslint-disable react/prop-types */
export const WebSocketProvider = ({ children }) => {
  let socket;
  let io;

  const dispatch = useDispatch();
  const store = useStore();

  const createMessage = (type, payload) =>
    deepSnakeCase(
      {
        createdAt: new Date().toISOString(),
        type,
        game: getGame(),
        payload,
        ...getGameState(store),
      },
      { skipKeys: ['hands'] },
    );

  const send = (type, payload) => {
    const message = createMessage(type, payload);
    socket.send(JSON.stringify(message));
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

export const withWebSocket = WrappedComponent => props => {
  const io = useWebSocketContext();

  return WrappedComponent({ io, ...props });
};

export default {};
