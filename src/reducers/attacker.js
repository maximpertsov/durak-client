import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const attacker = handleActions(
  {
    [actions.game.attacker.set]: set,
  },
  // TODO: remove hard-coded attacker
  'anna',
);

export default attacker;
