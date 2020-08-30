import { handleActions } from 'redux-actions';

import compact from 'lodash/compact';
import concat from 'lodash/concat';
import get from 'lodash/get';

import actions from 'actions';
import update from 'immutability-helper';

const add = (state, action) => {
  const {
    payload: { cards, player },
  } = action;

  const playerHand = get(state, player, []);
  const newHand = compact(concat(playerHand, cards));
  return update(state, { [player]: { $set: newHand } });
};

const set = (state, action) => action.payload;

const hands = handleActions(
  {
    [actions.game.hands.add]: add,
    [actions.game.hands.set]: set,
  },
  {},
);

export default hands;
