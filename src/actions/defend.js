import actions from 'actions';

const defend = message => dispatch => {
  const {
    toState: { hands, table, yielded },
  } = message;

  dispatch(actions.game.table.set(table));
  dispatch(actions.game.hands.set(hands));
  dispatch(actions.game.yielded.set(yielded));
};

export default defend;
