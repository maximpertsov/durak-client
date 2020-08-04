import { handleActions } from 'redux-actions';

import actions from 'actions';
import update from 'immutability-helper';

const append = (state, action) => update(state, { $push: [action.payload] });

const messages = handleActions(
  {
    [actions.messages.append]: append,
  },
  [],
);

export default messages;
