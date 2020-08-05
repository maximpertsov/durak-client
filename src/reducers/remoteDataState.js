import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

const remoteDataState = handleActions(
  {
    [actions.game.remoteDataState.set]: set,
  },
  'NOT_FETCHED',
);

export default remoteDataState;
