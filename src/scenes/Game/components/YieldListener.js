import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';

import actions from 'actions';
import { getDefender } from 'reducers';

const mapStateToProps = createSelector(
  state => state,
  state => getDefender(state),
  state => difference(state.players, state.yielded),

  (state, defender, notYielded) => ({
    hasDefended: isEqual(notYielded, [defender]),
    drawPile: state.drawPile,
    players: state.players,
    hands: state.hands,
  }),
);

const YieldListener = () => {
  const dispatch = useDispatch();
  const { drawPile, hands, hasDefended, players } = useSelector(
    mapStateToProps,
    isEqual,
  );

  useEffect(() => {
    if (!hasDefended) return;

    dispatch(actions.game.table.clear());
    dispatch(actions.game.yielded.clear());
    dispatch(actions.game.rotations.set.one());
  }, [dispatch, drawPile, hands, hasDefended, players]);

  return null;
};

export default YieldListener;
