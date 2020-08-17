import actions from 'actions';

const collect = message => dispatch => {
  const {
    toState: { drawPile, hands, players, table, yielded },
  } = message;

  dispatch(actions.game.drawPile.set(drawPile));
  dispatch(actions.game.hands.set(hands));
  dispatch(actions.game.players.set(players));
  dispatch(actions.game.table.set(table));
  dispatch(actions.game.yielded.set(yielded));
};

export default collect;
