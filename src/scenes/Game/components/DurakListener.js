import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

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
  const { drawPile, playersWithCards } = useSelector(mapStateToProps, isEqual);

  useEffect(() => {
    if (size(drawPile) > 0) return;
    if (size(playersWithCards) !== 1) return;

    const [durak] = playersWithCards;
    console.log(`${durak} is the durak!`);
  }, [drawPile, playersWithCards]);

  return null;
};

export default DurakListener;
