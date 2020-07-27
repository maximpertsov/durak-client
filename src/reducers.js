import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import flatMap from 'lodash/flatMap';

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

// utility functions
const append = (state, action) => update(state, { $push: [action.payload] });

const rootReducer = combineReducers({
  hand: handleAction(actions.game.hand.append, append, cards),
  table: handleAction(actions.game.table.append, append, [
    { suit: 'hearts', rank: 'ace' },
  ]),
});

export default rootReducer;
