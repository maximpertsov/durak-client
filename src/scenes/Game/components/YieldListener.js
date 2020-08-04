import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import difference from 'lodash/difference';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import actions from 'actions';
import draw from 'actions/draw';
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

    // TODO: only clear once, even though it doesn't matter
    dispatch(actions.game.table.clear());
    if (!isEmpty(drawPile)) {
      // TODO: make this a selector -- find first player with less than 6 cards
      const handSize = 6;
      const playerNeedingCards = find(
        players,
        player => compact(hands[player]).length < handSize,
      );
      if (playerNeedingCards) {
        dispatch(draw({ drawPile, hands, player: playerNeedingCards }));
        return;
      }
    }

    dispatch(actions.game.players.rotate());
    dispatch(actions.game.yielded.clear());
  }, [dispatch, drawPile, hands, hasDefended, players]);

  return null;
};

export default YieldListener;
