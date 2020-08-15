import actions from 'actions';

const attack = message => dispatch => {
  const {
    user,
    suit,
    rank,
    result: { hands, table, yielded },
  } = message;

  dispatch(actions.game.table.append({ suit, rank }));
  dispatch(actions.game.hand.remove({ suit, rank, user }));
  dispatch(actions.game.yielded.clear());
};

export default attack;
