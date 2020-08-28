import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const getInitialValue = () => window.location.pathname.split('/')[1] || null;

const game = handleActions(
  {
    [actions.game.id.set]: set,
  },
  getInitialValue(),
);

export default game;
