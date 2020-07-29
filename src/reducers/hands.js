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
const players = ['anna', 'vasyl', 'igor', 'grusha'];

const startingHands = chunk(
  sampleSize(cards, handSize * players.length),
  handSize,
);

const playersWithStartingHands = zipObject(players, startingHands);

const remove = (state, action) => {
  const {
    payload: { rank, suit, player },
  } = action;

  const playerHand = state[player];

  const index = findIndex(playerHand, { rank, suit });
  const newHand = update(playerHand, { $splice: [[index, 1, {}]] });
  return update(state, { [player]: { $set: newHand } });
};

export default handleActions(
  {
    [actions.game.hand.remove]: remove,
  },
  playersWithStartingHands,
);
