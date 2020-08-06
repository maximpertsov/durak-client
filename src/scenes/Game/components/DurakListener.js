import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import actions from 'actions';

const mapStateToProps = createSelector(
  state => state,
  state => state.hands,

  (state, hands) => ({
    drawPile: state.drawPile,
    playersWithCards: flatMap(hands, (hand, player) =>
      (isEmpty(compact(hand)) ? [] : [player]),
    ),
  }),
);

const DurakListener = () => {
  const dispatch = useDispatch();
  const { drawPile, playersWithCards } = useSelector(mapStateToProps, isEqual);

  useEffect(() => {
    if (size(drawPile) > 0) return;
    if (size(playersWithCards) !== 1) return;

    const [durak] = playersWithCards;
    dispatch(actions.messages.append({ text: `${durak} is the durak!` }));
  }, [dispatch, drawPile, playersWithCards]);

  return null;
};

export default DurakListener;
