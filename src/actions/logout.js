import actions from 'actions';

const logout = () => dispatch => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  dispatch(actions.game.user.set(null));
};

export default logout;
