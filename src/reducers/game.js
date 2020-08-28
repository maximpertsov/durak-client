import { handleActions } from 'redux-actions';

import actions from 'actions';

const set = (state, action) => action.payload;

// TODO: get at login/lobby
const getId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('g') || null;
};

const game = handleActions(
  {
    [actions.game.id.set]: set,
  },
  getId,
);

export default game;
