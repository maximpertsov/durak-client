import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';

import { getDefender } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  state => getDefender(state),
  state => difference(state.players, state.yielded),

  (state, defender, notYielded) => ({
    hasDefended:
      isEqual(state.user, defender) && isEqual(notYielded, [defender]),
  }),
);

const SuccessfulDefenseListener = () => {
  const io = useWebSocketContext();

  const { hasDefended } = useSelector(mapStateToProps, isEqual);

  useEffect(() => {
    if (!hasDefended) return;

    io.send('discarded_table_cards');
    // TODO: get players from attacker (original attacker!)
    io.send('draw_cards');
    io.send('set_new_attacker');
  }, [io, hasDefended]);

  return null;
};

export default SuccessfulDefenseListener;
