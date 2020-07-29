import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';

import actions from 'actions';
import update from 'immutability-helper';

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

const table = handleActions(
  {
    [actions.game.table.append]: add,
    [actions.game.table.stack]: stack,
  },
  [],
);

export default table;
