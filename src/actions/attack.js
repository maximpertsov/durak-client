import actions from 'actions';

const attack = ({ player, rank, suit }) => dispatch => {
  dispatch(actions.game.table.append({ suit, rank }));
  dispatch(actions.game.hand.remove({ suit, rank, player }));
};

export default attack;
