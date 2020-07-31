import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import actions from 'actions';
import update from 'immutability-helper';

// TODO: remove player import after it comes from server
import hands, { players as handPlayers } from './hands';
import table from './table';

// constants

// helpers
const set = (state, action) => action.payload;
const append = (state, action) => update(state, { $push: [action.payload] });

const rootReducer = combineReducers({
  attacker: handleActions(
    {
      [actions.game.attacker.set]: set,
    },
    // TODO: remove hard-coded attacker
    'anna',
  ),
  hands,
  messages: handleActions(
    {
      [actions.messages.append]: append,
    },
    [],
  ),
  players: handleActions(
    {
      [actions.game.players.set]: set,
    },
    handPlayers,
  ),
  table,
  username: handleActions(
    {
      [actions.game.username.set]: set,
    },
    // TODO: right now this is a random player
    sample(handPlayers),
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
