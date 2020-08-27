import actions from 'actions';
import logout from 'actions/logout';
import updateLoginForm from 'actions/updateLoginForm';
import jwtDecode from 'jwt-decode';
import client from 'utils/client';

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
    dispatch(logout());
  } finally {
    dispatch(updateLoginForm({ username: '', password: '' }));
  }
};

export default login;
