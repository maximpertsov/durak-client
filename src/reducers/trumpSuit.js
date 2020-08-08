import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const trumpSuit = handleActions(
  {
    [actions.game.trumpSuit.set]: set,
  },
  null,
);

export default trumpSuit;
