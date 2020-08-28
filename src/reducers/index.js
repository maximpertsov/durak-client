import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';

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

const getPlayersWithCardsOrAttacked = state =>
  reject(state.players, player => isEmpty(state.hands[player]));

export const getDefender = state => getPlayersWithCardsOrAttacked(state)[1];

export const getPlayersFromUser = state => {
  if (!state.user) return [];

  const offset = findIndex(state.players, player => player === state.user);
  return state.players.map(
    (_, index) => state.players[(index + offset) % state.players.length],
  );
};

export const getAttackers = state => {
  const playersWithCards = getPlayersWithCardsOrAttacked(state);
  if (isEmpty(state.table)) return [playersWithCards[0]];

  const defender = getDefender(state);
  return reject(playersWithCards, player => player === defender);
};

export const getUnbeatenCards = state =>
  flatMap(state.table, cards => {
    if (cards.length === 1) return [cards[0]];

    return [];
  });
