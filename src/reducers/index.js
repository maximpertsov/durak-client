import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import last from 'lodash/last';

import actions from 'actions';

import drawPile from './drawPile';
import hands from './hands';
import loginForm from './loginForm';
import messages from './messages';
import players from './players';
import remoteDataState from './remoteDataState';
import selectedCards from './selectedCards';
import table from './table';
import trumpSuit from './trumpSuit';
import user from './user';
import yielded from './yielded';

const rootReducer = combineReducers({
  drawPile,
  hands,
  loginForm,
  messages,
  // TODO: move this to the server?
  passCount: handleAction(
    actions.game.passCount.set,
    (state, action) => action.payload,
    0,
  ),
  gameList: handleAction(
    actions.home.gameList.set,
    (state, action) => action.payload,
    null,
  ),
  players,
  remoteDataState,
  selectedCards,
  table,
  trumpSuit,
  user,
  yielded,
});

export default rootReducer;

export const getGame = () => window.location.pathname.split('/')[1] || null;

const getCurrentState = state => get(last(state.messages), 'toState');

export const getDefender = state =>
  get(getCurrentState(state), 'defender', null);

export const getAttackers = state =>
  get(getCurrentState(state), 'attackers', []);

export const getWinners = state => get(getCurrentState(state), 'winners', []);

export const getDurak = state => get(getCurrentState(state), 'durak', null);

export const getPlayersFromUser = state => {
  if (!state.user) return [];

  const offset = findIndex(state.players, player => player === state.user);
  return state.players.map(
    (_, index) => state.players[(index + offset) % state.players.length],
  );
};

export const getUnbeatenCards = state =>
  flatMap(state.table, cards => {
    if (cards.length === 1) return [cards[0]];

    return [];
  });
