import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const user = handleActions(
  {
    [actions.game.user.set]: set,
  },
  null,
);

export default user;
