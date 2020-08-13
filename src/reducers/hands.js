import { handleActions } from 'redux-actions';

import compact from 'lodash/compact';
import concat from 'lodash/concat';
import findIndex from 'lodash/findIndex';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import map from 'lodash/map';

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

const remove = (state, action) => {
  const {
    payload: { rank, suit, user },
  } = action;

  const playerHand = state[user];

  const index = findIndex(playerHand, { rank, suit });
  const newHand = update(playerHand, { $splice: [[index, 1, null]] });
  return update(state, { [user]: { $set: newHand } });
};

const compactCards = state =>
  fromPairs(map(state, (cards, player) => [player, compact(cards)]));

const set = (state, action) => action.payload;

const hands = handleActions(
  {
    [actions.game.hand.add]: add,
    [actions.game.hand.remove]: remove,
    [actions.game.hand.compact]: compactCards,
    [actions.game.hand.set]: set,
  },
  {},
);

export default hands;
