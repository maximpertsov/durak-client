import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';
import union from 'lodash/union';

import actions from 'actions';
import { getDefender } from 'reducers';

const hasDefended = ({ hands, players, yielded }) => {
  const defender = getDefender({ hands, players });
  const notYielded = difference(players, yielded);

  return isEqual(notYielded, [defender]);
};

const yieldAttack = ({ user, yielded, players, hands }) => dispatch => {
  dispatch(actions.game.yielded.add(user));

  if (!hasDefended({ yielded: union(yielded, [user]), hands, players })) return;

  dispatch(actions.game.table.clear());
  dispatch(actions.game.yielded.clear());
  dispatch(actions.game.rotations.set.one());
};

export default yieldAttack;
