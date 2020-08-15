import actions from 'actions';

const attack = message => dispatch => {
  const {
    user,
    suit,
    rank,
    result: { hands, table, yielded },
  } = message;

  dispatch(actions.game.table.set(table));
  dispatch(actions.game.hands.set(hands));
  dispatch(actions.game.yielded.set(yielded));
};

export default attack;
