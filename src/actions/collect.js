import flatten from 'lodash/flatten';

import actions from 'actions';

const collect = ({ table, player }) => dispatch => {
  dispatch(actions.game.yielded.clear());
  dispatch(actions.game.hand.add({ cards: flatten(table), player }));
  dispatch(actions.game.table.clear());
};

export default collect;
