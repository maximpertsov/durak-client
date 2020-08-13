import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import compact from 'lodash/compact';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import actions from 'actions';
import draw from 'actions/draw';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    drawPile: state.drawPile,
    hands: state.hands,
    players: state.players,
    rotations: state.rotations,
  }),
);

const DrawListener = () => {
  // const dispatch = useDispatch();
  // const { drawPile, hands, players, rotations } = useSelector(
  //   mapStateToProps,
  //   isEqual,
  // );
  //
  // useEffect(() => {
  //   if (rotations === 0) return;
  //
  //   if (!isEmpty(drawPile)) {
  //     // TODO: make this a selector -- find first player with less than 6 cards
  //     const handSize = 6;
  //     const playerNeedingCards = find(
  //       players,
  //       player => size(compact(hands[player])) < handSize,
  //     );
  //     if (playerNeedingCards) {
  //       dispatch(draw({ drawPile, hands, player: playerNeedingCards }));
  //       return;
  //     }
  //   }
  //
  //   const skipPlayers = players.filter(player =>
  //     isEmpty(compact(hands[player])),
  //   );
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < rotations; i++) {
  //     dispatch(actions.game.players.rotate({ skipPlayers }));
  //   }
  //   dispatch(actions.game.rotations.set.zero());
  //   dispatch(actions.game.hand.compact());
  // }, [dispatch, drawPile, hands, players, rotations]);

  return null;
};

export default DrawListener;
