import actions from 'actions';
import updateLoginForm from 'actions/updateLoginForm';
import jwtDecode from 'jwt-decode';
import client from 'utils/client';

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
    const {
      data: { access, refresh },
    } = await client.post('token', { username, password });
    const { user } = jwtDecode(access);

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    dispatch(actions.game.user.set(user));
  } catch (error) {
    dispatch(updateLoginForm({ error: 'Login failed' }));
    dispatch(actions.game.user.set(null));
  } finally {
    dispatch(updateLoginForm({ username: '', password: '' }));
  }
};

export default login;
