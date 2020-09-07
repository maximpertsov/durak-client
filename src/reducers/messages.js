import { handleActions } from 'redux-actions';

import actions from 'actions';
import update from 'immutability-helper';

const append = (state, action) => update(state, { $push: [action.payload] });
const clear = () => [];

const messages = handleActions(
  {
    [actions.messages.append]: append,
    [actions.messages.clear]: clear,
  },
  [],
);

export default messages;
