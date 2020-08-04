import { handleActions } from 'redux-actions';

import actions from 'actions';
import update from 'immutability-helper';

const set = (state, action) => action.payload;
const append = (state, action) => update(state, { $push: [action.payload] });

const players = handleActions(
  {
    [actions.game.players.set]: set,
    [actions.game.players.add]: append,
  },
  [],
);

export default players;
