import { handleActions } from 'redux-actions';

import isEqual from 'lodash/fp/isEqual';

import concat from 'lodash/concat';
import reject from 'lodash/reject';

import actions from 'actions';

const add = (state, action) => concat(state, action.payload);
const clear = () => [];
const remove = (state, action) => reject(state, isEqual(action.payload));
const set = (state, action) => action.payload;

const selectedCards = handleActions(
  {
    [actions.game.selectedCards.add]: add,
    [actions.game.selectedCards.clear]: clear,
    [actions.game.selectedCards.remove]: remove,
    [actions.game.selectedCards.set]: set,
  },
  [],
);

export default selectedCards;
