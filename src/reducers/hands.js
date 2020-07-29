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

const append = (state, action) => update(state, { $push: [action.payload] });
const remove = (state, action) => {
  const index = findIndex(state, action.payload);
  return update(state, { $splice: [[index, 1, {}]] });
};

export default handleActions(
  {
    [actions.game.hand.append]: append,
    [actions.game.hand.remove]: remove,
  },
  playersWithStartingHands,
);
