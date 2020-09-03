import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import isEqual from 'lodash/fp/isEqual';

import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import last from 'lodash/last';

import actions from 'actions';

import loginForm from './loginForm';
import messages from './messages';
import remoteDataState from './remoteDataState';
import selectedCards from './selectedCards';
import user from './user';

const rootReducer = combineReducers({
  loginForm,
  messages,
  gameList: handleAction(
    actions.home.gameList.set,
    (state, action) => action.payload,
    null,
  ),
  remoteDataState,
  selectedCards,
  user,
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

export const getDrawPile = state => fromCurrentState(state, 'drawPile', []);
export const getHands = state => fromCurrentState(state, 'hands', {});
export const getPlayers = state => fromCurrentState(state, 'players', []);
export const getTable = state => fromCurrentState(state, 'table', []);
export const getTrumpSuit = state => fromCurrentState(state, 'trumpSuit', null);
export const getYielded = state => fromCurrentState(state, 'yielded', []);

export const getWithPassing = state =>
  fromCurrentState(state, 'withPassing', null);
export const getLowestRank = state =>
  fromCurrentState(state, 'lowestRank', null);
export const getAttackLimit = state =>
  fromCurrentState(state, 'attackLimit', null);

export const getPlayersFromUser = state => {
  if (!state.user) return [];

  const _players = getPlayers(state);
  const offset = findIndex(_players, isEqual(state.user));
  return _players.map(
    (_, index) => _players[(index + offset) % _players.length],
  );
};

export const getUnbeatenCards = state =>
  flatMap(getTable(state), cards => {
    if (cards.length === 1) return [cards[0]];

    return [];
  });
