import { combineReducers } from 'redux';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';

import drawPile from './drawPile';
import game from './game';
import hands from './hands';
import loginForm from './loginForm';
import messages from './messages';
import players from './players';
import remoteDataState from './remoteDataState';
import rotations from './rotations';
import table from './table';
import trumpSuit from './trumpSuit';
import user from './user';
import yielded from './yielded';

const rootReducer = combineReducers({
  drawPile,
  game,
  hands,
  loginForm,
  messages,
  players,
  remoteDataState,
  rotations,
  table,
  trumpSuit,
  user,
  yielded,
});

export default rootReducer;

const getPlayersWithCardsOrAttacked = state =>
  reject(state.players, player => isEmpty(state.hands[player]));

export const getDefender = state => getPlayersWithCardsOrAttacked(state)[1];

export const getPlayersFromUser = state => {
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
