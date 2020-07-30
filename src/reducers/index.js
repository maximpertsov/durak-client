import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';

import actions from 'actions';
import update from 'immutability-helper';

// TODO: remove player import after it comes from server
import hands, { players } from './hands';
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
    null,
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
    players,
  ),
  table,
  username: handleActions(
    {
      [actions.game.username.set]: set,
    },
    // TODO: should not be hardcoded
    players[0],
  ),
});

export default rootReducer;

export const getDefender = ({ attacker, players }) => {
  const index = findIndex(players, player => player === attacker);
  return players[(index + 1) % players.length];
};
