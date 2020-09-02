import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import isEqual from 'lodash/fp/isEqual';

import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import last from 'lodash/last';

import actions from 'actions';

import drawPile from './drawPile';
import hands from './hands';
import loginForm from './loginForm';
import messages from './messages';
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
  remoteDataState,
  selectedCards,
  table,
  trumpSuit,
  user,
  yielded,
});

export default rootReducer;

export const getGame = () => window.location.pathname.split('/')[1] || null;

export const getCurrentState = state =>
  get(last(state.messages), 'toState', {});

const fromCurrentState = (state, field, defaultValue) =>
  get(getCurrentState(state), field, defaultValue);

export const getDefender = state => fromCurrentState(state, 'defender', null);
export const getAttackers = state => fromCurrentState(state, 'attackers', []);
export const getWinners = state => fromCurrentState(state, 'winners', []);
export const getDurak = state => fromCurrentState(state, 'durak', null);
export const getPlayers = state => fromCurrentState(state, 'players', []);

export const getPlayersFromUser = state => {
  if (!state.user) return [];

  const _players = getPlayers(state);
  const offset = findIndex(_players, isEqual(state.user));
  return _players.map(
    (_, index) => _players[(index + offset) % _players.length],
  );
};

export const getUnbeatenCards = state =>
  flatMap(state.table, cards => {
    if (cards.length === 1) return [cards[0]];

    return [];
  });
