import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import actions from 'actions';

import hands from './hands';
import table from './table';

const rootReducer = combineReducers({
  hands,
  table,
  username: handleActions(
    {
      [actions.game.username.set]: (state, payload) => payload,
    },
    'anna',
  ),
});

export default rootReducer;
