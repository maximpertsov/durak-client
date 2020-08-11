import { handleActions } from 'redux-actions';

import actions from 'actions';
import Cookies from 'js-cookie';

const set = (state, action) => action.payload;

const getInitialValue = () => Cookies.get('sid') || null;

const user = handleActions(
  {
    [actions.game.user.set]: set,
  },
  getInitialValue(),
);

export default user;
