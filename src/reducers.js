import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import sampleSize from 'lodash/sampleSize';

import actions from 'actions';
import update from 'immutability-helper';
import { ranks, suits } from 'utils/gameLogic';

// constants
const cards = flatMap(suits, suit => ranks.map(rank => ({ rank, suit })));
const handSize = 6;
const startingHand = sampleSize(cards, handSize);

// reducer functions
// Hand
const append = (state, action) => update(state, { $push: [action.payload] });
const remove = (state, action) => {
  const index = findIndex(state, action.payload);
  return update(state, { $splice: [[index, 1, {}]] });
};
// Table
const add = (state, action) => update(state, { $push: [[action.payload]] });
const stack = (state, action) => {
  const {
    payload: { baseCard, card },
  } = action;

  const index = findIndex(state, cardStack => isEqual(last(cardStack), baseCard),
  );
  const newCardStack = update(state[index], { $push: [card] });
  return update(state, { $splice: [[index, 1, newCardStack]] });
};

const rootReducer = combineReducers({
  hand: handleActions(
    {
      [actions.game.hand.append]: append,
      [actions.game.hand.remove]: remove,
    },
    startingHand,
  ),
  table: handleActions(
    {
      [actions.game.table.append]: add,
      [actions.game.table.stack]: stack,
    },
    [],
  ),
});

export default rootReducer;
