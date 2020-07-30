import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import actions from 'actions';
import update from 'immutability-helper';

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
  table,
  username: handleActions(
    {
      [actions.game.username.set]: set,
    },
    players[0],
  ),
});

export default rootReducer;
