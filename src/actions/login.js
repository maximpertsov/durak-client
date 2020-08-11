import actions from 'actions';
import updateLoginForm from 'actions/updateLoginForm';
import fp from 'utils/lodashFp';

// TODO: obviously for testing only
const userPasswords = {
  maxim: '1234',
  mariel: '5555',
  anna: '1111',
  vasyl: '2222',
  igor: '3333',
  grusha: '4444',
};

const login = ({ username, password }) => async dispatch => {
  try {
    if (fp.get(username, userPasswords) !== password) {
      throw new Error();
    }
    dispatch(actions.game.user.set(username));
  } catch (error) {
    dispatch(updateLoginForm({ error: 'Login failed' }));
  } finally {
    dispatch(updateLoginForm({ username: '', password: '' }));
  }
};

export default login;
