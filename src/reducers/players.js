import { handleActions } from 'redux-actions';
import concat from 'lodash/concat';
import head from 'lodash/head';
import tail from 'lodash/tail';

import actions from 'actions';
import update from 'immutability-helper';

const set = (state, action) => action.payload;
const append = (state, action) => update(state, { $push: [action.payload] });
const rotate = state => concat(tail(state), head(state));

const players = handleActions(
  {
    [actions.game.players.set]: set,
    [actions.game.players.add]: append,
    [actions.game.players.rotate]: rotate,
  },
  [],
);

export default players;
