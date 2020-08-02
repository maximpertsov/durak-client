import actions from 'actions';

const joinGame = ({ player }) => dispatch => {
  dispatch(actions.game.players.add({ player }));
};

export default joinGame;
