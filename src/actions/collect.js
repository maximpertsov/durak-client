import flatten from 'lodash/flatten';

import actions from 'actions';

const collect = ({ user, table }) => dispatch => {
  dispatch(actions.game.yielded.clear());
  dispatch(actions.game.hands.add({ cards: flatten(table), player: user }));
  dispatch(actions.game.table.clear());
  dispatch(actions.game.rotations.set.two());
};

export default collect;
