import actions from 'actions';

const attack = ({ user, rank, suit }) => dispatch => {
  dispatch(actions.game.table.append({ suit, rank }));
  dispatch(actions.game.hand.remove({ suit, rank, user }));
  dispatch(actions.game.yielded.clear());
};

export default attack;
