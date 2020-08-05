import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from 'actions';
import client from 'utils/client';

export const WebSocketContext = createContext(null);

/* eslint-disable react/prop-types */
export const WebSocketProvider = ({ children }) => {
  let socket;
  let io;

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // TODO: remove hardcoded game
  const createMessage = (type, payload) => ({
    type,
    game: 'abc123',
    user,
    payload,
  });

  const send = (type, payload) => {
    const message = createMessage(type, payload);

    client.post('game/abc123/events', message).then(() => {
      socket.send(JSON.stringify(message));
    });
  };

  if (!socket) {
    socket = new WebSocket(process.env.REACT_APP_WS_URL);

    socket.onmessage = event => {
      const message = JSON.parse(event.data);
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
