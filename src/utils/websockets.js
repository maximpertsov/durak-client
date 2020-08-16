import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import isEqual from 'lodash/isEqual';

import actions from 'actions';
import client from 'utils/client';
import { deepCamelCase, deepSnakeCase } from 'utils/lodash';

export const WebSocketContext = createContext(null);

const mapStateToProps = createSelector(
  state => state,

  state => ({
    fromState: {
      hands: state.hands,
      table: state.table,
      yielded: state.yielded,
    },
    game: state.game,
    user: state.user,
  }),
);

/* eslint-disable react/prop-types */
export const WebSocketProvider = ({ children }) => {
  let socket;
  let io;

  const dispatch = useDispatch();
  const { fromState, game, user } = useSelector(mapStateToProps, isEqual);

  const createMessage = (type, payload) =>
    // TODO: maybe the server should take care of the snake-casing?
    deepSnakeCase({
      createdAt: new Date().toISOString(),
      type,
      game,
      user,
      fromState,
      payload,
    });

  const wsPersistedTypes = ['attacked'];

  const send = (type, payload) => {
    const message = createMessage(type, payload);

    if (wsPersistedTypes.includes(type)) {
      socket.send(JSON.stringify(message));
    } else {
      // TODO: Legacy logic -- you can retire once the websocket
      // server handles persisting all message types
      client.post(`game/${game}/events`, message).then(() => {
        socket.send(JSON.stringify(message));
      });
    }
  };

  if (!socket) {
    socket = new WebSocket(process.env.REACT_APP_WS_URL);

    socket.onmessage = event => {
      // TODO: be careful not to camelcase player names
      const message = deepCamelCase(JSON.parse(event.data));
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
