import { handleActions } from 'redux-actions';
import compact from 'lodash/compact';
import concat from 'lodash/concat';
import findIndex from 'lodash/findIndex';
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

const add = (state, action) => {
  const {
    payload: { cards, player },
  } = action;

  const playerHand = get(state, player, []);
  const newHand = compact(concat(playerHand, cards));
  return update(state, { [player]: { $set: newHand } });
};

const remove = (state, action) => {
  const {
    payload: { rank, suit, user },
  } = action;

  const playerHand = state[user];

  const index = findIndex(playerHand, { rank, suit });
  const newHand = update(playerHand, { $splice: [[index, 1, null]] });
  return update(state, { [user]: { $set: newHand } });
};

const hands = handleActions(
  {
    [actions.game.hand.add]: add,
    [actions.game.hand.remove]: remove,
  },
  {},
);

export default hands;
