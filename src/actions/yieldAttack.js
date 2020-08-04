import actions from 'actions';

const yieldAttack = ({ user }) => dispatch => {
  dispatch(actions.game.yielded.add(user));
};

export default yieldAttack;
