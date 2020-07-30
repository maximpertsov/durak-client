import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';

import actions from 'actions';

export const WebSocketContext = createContext(null);

const createMessage = (type, payload) => ({
  createdAt: new Date(),
  type,
  payload,
});

/* eslint-disable react/prop-types */
export const WebSocketProvider = ({ children }) => {
  let socket;
  let io;

  const dispatch = useDispatch();

  const send = (type, payload) => {
    const message = createMessage(type, payload);
    socket.send(JSON.stringify(message));
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

export default {};
