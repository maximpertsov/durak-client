import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

// TODO: get at login/lobby
const getId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('g') || 'abc123';
};

const id = handleActions(
  {
    [actions.game.players.set]: set,
  },
  getId,
);

export default id;
