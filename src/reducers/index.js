import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import sampleSize from 'lodash/sampleSize';

import actions from 'actions';
import update from 'immutability-helper';
import { cards } from 'utils/gameLogic';

import table from './table';

// constants
const handSize = 6;
const startingHand = sampleSize(cards, handSize);

// reducer functions
// Hand
const append = (state, action) => update(state, { $push: [action.payload] });
const remove = (state, action) => {
  const index = findIndex(state, action.payload);
  return update(state, { $splice: [[index, 1, {}]] });
};

const rootReducer = combineReducers({
  hand: handleActions(
    {
      [actions.game.hand.append]: append,
      [actions.game.hand.remove]: remove,
    },
    startingHand,
  ),
  table,
});

export default rootReducer;
