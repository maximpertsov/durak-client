import { handleActions } from 'redux-actions';
import chunk from 'lodash/chunk';
import findIndex from 'lodash/findIndex';
import sampleSize from 'lodash/sampleSize';
import zipObject from 'lodash/zipObject';

import actions from 'actions';
import update from 'immutability-helper';
import { cards } from 'utils/gameLogic';

// constants
const handSize = 6;
// TODO: remove hard-coded players
export const players = ['anna', 'vasyl', 'igor', 'grusha'];

const startingHands = chunk(
  sampleSize(cards, handSize * players.length),
  handSize,
);

// const playersWithStartingHands = zipObject(players, startingHands);

// TODO: hard-coded starting game state
const playersWithStartingHands = {
  anna: [
    {
      rank: 3,
      suit: 'hearts',
    },
    {
      rank: 8,
      suit: 'hearts',
    },
    {
      rank: 'jack',
      suit: 'hearts',
    },
    {
      rank: 7,
      suit: 'clubs',
    },
    {
      rank: 4,
      suit: 'diamonds',
    },
    {
      rank: 7,
      suit: 'hearts',
    },
  ],
  vasyl: [
    {
      rank: 9,
      suit: 'clubs',
    },
    {
      rank: 4,
      suit: 'clubs',
    },
    {
      rank: 'king',
      suit: 'diamonds',
    },
    {
      rank: 'jack',
      suit: 'spades',
    },
    {
      rank: 6,
      suit: 'diamonds',
    },
    {
      rank: 'ace',
      suit: 'diamonds',
    },
  ],
  igor: [
    {
      rank: 'queen',
      suit: 'clubs',
    },
    {
      rank: 7,
      suit: 'spades',
    },
    {
      rank: 'queen',
      suit: 'spades',
    },
    {
      rank: 10,
      suit: 'spades',
    },
    {
      rank: 'jack',
      suit: 'clubs',
    },
    {
      rank: 3,
      suit: 'clubs',
    },
  ],
  grusha: [
    {
      rank: 8,
      suit: 'spades',
    },
    {
      rank: 3,
      suit: 'spades',
    },
    {
      rank: 8,
      suit: 'clubs',
    },
    {
      rank: 2,
      suit: 'diamonds',
    },
    {
      rank: 2,
      suit: 'spades',
    },
    {
      rank: 8,
      suit: 'diamonds',
    },
  ],
};

const remove = (state, action) => {
  const {
    payload: { rank, suit, player },
  } = action;

  const playerHand = state[player];

  const index = findIndex(playerHand, { rank, suit });
  const newHand = update(playerHand, { $splice: [[index, 1, {}]] });
  return update(state, { [player]: { $set: newHand } });
};

const hands = handleActions(
  {
    [actions.game.hand.remove]: remove,
  },
  playersWithStartingHands,
);

export default hands;
