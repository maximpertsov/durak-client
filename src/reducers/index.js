import { combineReducers } from 'redux';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';

import attacker from './attacker';
import drawPile from './drawPile';
import hands from './hands';
import messages from './messages';
import players from './players';
import table from './table';
import user from './user';
import yielded from './yielded';

const rootReducer = combineReducers({
  attacker,
  drawPile,
  hands,
  messages,
  players,
  table,
  user,
  yielded,
});

export default rootReducer;

export const getDefender = ({ attacker, players }) => {
  const index = findIndex(players, player => player === attacker);
  return players[(index + 1) % players.length];
};

export const getPlayersFromUser = ({ user, players }) => {
  const offset = findIndex(players, player => player === user);
  return players.map((_, index) => players[(index + offset) % players.length]);
};

export const getAttackers = state => {
  if (isEmpty(state.table)) return [state.attacker];

  const defender = getDefender(state);
  return state.players.filter(player => player !== defender);
};

export const getUnbeatenCards = state =>
  flatMap(state.table, cards => {
    if (cards.length === 1) return [cards[0]];

    return [];
  });
