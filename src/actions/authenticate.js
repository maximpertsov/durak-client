import actions from 'actions';
import logout from 'actions/logout';
import updateLoginForm from 'actions/updateLoginForm';
import jwtDecode from 'jwt-decode';
import client, { isSuccess } from 'utils/client';

const EXPIRATION_BUFFER = 1000;

const authenticate = () => async dispatch => {
  try {
    const response = await client.post('token/refresh', {
      refresh: localStorage.getItem('refresh'),
    });

    if (isSuccess(response)) {
      const { access } = response.data;
      const { user, exp } = jwtDecode(access);

      localStorage.setItem('access', access);

      dispatch(actions.game.user.set(user));

      setTimeout(
        dispatch(authenticate()),
        exp * 1000 - Date.now() - EXPIRATION_BUFFER,
      );
    }
  } catch (error) {
    dispatch(logout());
  } finally {
    dispatch(updateLoginForm({ username: '', password: '' }));
  }
};

export default authenticate;
