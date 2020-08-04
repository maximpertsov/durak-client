import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const drawPile = handleActions(
  {
    [actions.game.drawPile.set]: set,
  },
  [],
);

export default drawPile;
