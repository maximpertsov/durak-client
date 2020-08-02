import actions from 'actions';

const joinGame = ({ user }) => dispatch => {
  dispatch(actions.game.players.add(user));
};

export default joinGame;
