import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import actions from 'actions';
import update from 'immutability-helper';

import attacker from './attacker';
// TODO: remove player import after it comes from server
import hands, { players as handPlayers } from './hands';
import messages from './messages';
import table from './table';

// helpers
const set = (state, action) => action.payload;
const append = (state, action) => update(state, { $push: [action.payload] });

// TODO: get at login
const getUsername = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('u') || sample(handPlayers);
};

const rootReducer = combineReducers({
  attacker,
  hands,
  messages,
  players: handleActions(
    {
      [actions.game.players.set]: set,
      [actions.game.players.add]: append,
    },
    [],
  ),
  table,
  username: handleActions(
    {
      [actions.game.username.set]: set,
    },
    getUsername(),
  ),
  yielded: handleActions(
    {
      [actions.game.yielded.add]: append,
      [actions.game.yielded.clear]: () => [],
    },
    [],
  ),
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
