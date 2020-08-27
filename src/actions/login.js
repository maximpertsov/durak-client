import actions from 'actions';
import updateLoginForm from 'actions/updateLoginForm';
import Cookies from 'js-cookie';
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
    // create cookie that expires in 1 hour
    // https://github.com/js-cookie/js-cookie/issues/74
    // https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day
    Cookies.set('sid', username, { expires: 1 / 24 });
  } catch (error) {
    dispatch(updateLoginForm({ error: 'Login failed' }));
    Cookies.remove('sid');
    dispatch(actions.game.user.set(null));
  } finally {
    dispatch(updateLoginForm({ username: '', password: '' }));
  }
};

export default login;
