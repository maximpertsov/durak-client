import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import actions from 'actions';

import attacker from './attacker';
// TODO: remove player import after it comes from server
import hands, { players as handPlayers } from './hands';
import messages from './messages';
import players from './players';
import table from './table';
import yielded from './yielded';

// helpers
const set = (state, action) => action.payload;

// TODO: get at login
const getUsername = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('u') || sample(handPlayers);
};

const rootReducer = combineReducers({
  attacker,
  hands,
  messages,
  players,
  table,
  username: handleActions(
    {
      [actions.game.username.set]: set,
    },
    getUsername(),
  ),
  yielded,
});

export default rootReducer;

export const getDefender = ({ attacker, players }) => {
  const index = findIndex(players, player => player === attacker);
  return players[(index + 1) % players.length];
};

export const getPlayersFromUser = ({ username, players }) => {
  const offset = findIndex(players, player => player === username);
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
