import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

// TODO: get at login
const getUser = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('u') || 'anna';
};

const user = handleActions(
  {
    [actions.game.user.set]: set,
  },
  getUser(),
);

export default user;
