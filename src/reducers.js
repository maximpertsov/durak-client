import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';
import flatMap from 'lodash/flatMap';
import reject from 'lodash/reject';
import sampleSize from 'lodash/sampleSize';

import actions from 'actions';
import update from 'immutability-helper';

// constants
const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const ranks = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
];
const cards = flatMap(suits, suit => ranks.map(rank => ({ rank, suit })));
const handSize = 6;
const startingHand = sampleSize(cards, handSize);

// utility functions
const append = (state, action) => update(state, { $push: [action.payload] });
const remove = (state, action) => reject(state, action.payload);

const rootReducer = combineReducers({
  hand: handleActions(
    {
      [actions.game.hand.append]: append,
      [actions.game.hand.remove]: remove,
    },
    startingHand,
  ),
  table: handleAction(actions.game.table.append, append, []),
});

export default rootReducer;
