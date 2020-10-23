import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import isEqual from 'lodash/fp/isEqual';

import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';

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
  gameRequests: handleAction(
    actions.home.gameRequests.set,
    (state, action) => action.payload,
    null,
  ),
  remoteDataState,
  selectedCards,
  user,
});

export default rootReducer;

export const getGame = () => window.location.pathname.split('/')[1] || null;

export const getNewGameFeatureFlag = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('ng') === 'true';
};

export const getCurrentState = state =>
  get(last(state.messages), 'toState', {});

const fromCurrentState = (state, field, defaultValue) =>
  get(getCurrentState(state), field, defaultValue);

export const getCollector = state => fromCurrentState(state, 'collector', null);
export const getDefender = state => fromCurrentState(state, 'defender', null);
export const getAttackers = state => fromCurrentState(state, 'attackers', []);
export const getWinners = state => fromCurrentState(state, 'winners', []);
export const getDurak = state => fromCurrentState(state, 'durak', null);
export const getJoined = state => fromCurrentState(state, 'joined', null);

export const getCardsLeft = state => fromCurrentState(state, 'cardsLeft', null);
export const getLastCard = state => fromCurrentState(state, 'lastCard', null);
export const getTrumpSuit = state => fromCurrentState(state, 'trumpSuit', null);

export const getHands = state => {
  const result = fromCurrentState(state, 'hands', null);
  if (result) return result;

  return fromPairs(
    fromCurrentState(state, 'players', []).map(player => [
      player.id,
      player.hand,
    ]),
  );
};

export const getPlayers = state => {
  const playerData = fromCurrentState(state, 'players', []);
  return sortBy(
    playerData.map(player => {
      if (isPlainObject(player)) return player.id;
      // Assume the player data IS the player id if not a plain object
      return player;
    }),
    ['order'],
  );
};
export const getTable = state => fromCurrentState(state, 'table', []);
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
