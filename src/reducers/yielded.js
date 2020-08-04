import { handleActions } from 'redux-actions';

import actions from 'actions';
import update from 'immutability-helper';

const append = (state, action) => update(state, { $push: [action.payload] });

const yielded = handleActions(
  {
    [actions.game.yielded.add]: append,
    [actions.game.yielded.clear]: () => [],
  },
  [],
);

export default yielded;
