import 'index.css';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from 'App';
import rootReducer from 'reducers';
import * as serviceWorker from 'serviceWorker';
import { WebSocketProvider } from 'utils/websockets';

const getReduxDevExtOptions = () => {
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) return f => f;
  if (process.env.NODE_ENV !== 'development') return f => f;

  return window.__REDUX_DEVTOOLS_EXTENSION__();
};

// source: https://www.kirupa.com/html5/check_if_you_are_on_a_touch_enabled_device.htm
const getDndBackend = () => {
  const msTouchEnabled = window.navigator.msMaxTouchPoints;
  const generalTouchEnabled = 'ontouchstart' in document.createElement('div');

  if (msTouchEnabled || generalTouchEnabled) {
    return TouchBackend;
  }
  return HTML5Backend;
};

const store = compose(
  applyMiddleware(thunk),
  getReduxDevExtOptions(),
)(createStore)(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <DndProvider backend={getDndBackend()}>
        <App />
      </DndProvider>
    </WebSocketProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
