import { combineActions, handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const rotations = handleActions(
  {
    [combineActions(
      actions.game.rotations.set.zero,
      actions.game.rotations.set.one,
      actions.game.rotations.set.two,
    )]: set,
  },
  0,
);

export default rotations;
