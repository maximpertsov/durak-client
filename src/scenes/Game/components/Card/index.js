import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import isEqual from 'lodash/fp/isEqual';

import concat from 'lodash/concat';
import find from 'lodash/find';
import get from 'lodash/get';
import size from 'lodash/size';
import some from 'lodash/some';
import uniqBy from 'lodash/uniqBy';
import uniqWith from 'lodash/uniqWith';

import actions from 'actions';
import { getHands } from 'reducers';
import { cards as allCards, getRank, getSuit } from 'utils/gameLogic';

import getCardImage, { getBackOfCard } from './images';

const uniqueCards = cards => uniqWith(cards, isEqual);
const sameRank = cards => size(uniqBy(uniqueCards(cards), getRank)) === 1;

const mapStateToProps = createSelector(
  state => state,
  state => state.selectedCards,
  (_, props) => props.card,

  (state, selectedCards, card) => ({
    hand: get(getHands(state), state.user),
    selectedCard: find(selectedCards, isEqual(card)),
    selectedCards,
    trumpSuit: state.trumpSuit,
  }),
);

const topAdjust = '156.67%';

const SelectionIndicator = styled.div({
  backgroundColor: 'rgba(30,179,0,0.3)',
  height: '100%',
  marginTop: `-${topAdjust}`,
  position: 'absolute',
  width: '100%',
  zIndex: '1',
});

const Wrapper = styled.div(({ card, isDragging, flipped, trumpSuit }) => {
  const cardImage = flipped ? getBackOfCard() : getCardImage(card);
  const isGlowing = !flipped && trumpSuit === getSuit(card);

  const glow = keyframes({
    '0%': {
      boxShadow: '0 0 20px #d35400',
    },
    '100%': {
      boxShadow: '0 0 10px #d35400',
    },
  });

  return {
    animation: isGlowing ? `${glow} 1s ease alternate infinite` : null,
    backgroundImage: `url(${cardImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '1px',
    height: '0%',
    opacity: isDragging ? '30%' : '100%',
    paddingTop: topAdjust,
    position: 'relative',
  };
});

const Card = ({ card, flipped }) => {
  const dispatch = useDispatch();
  const { hand, selectedCard, selectedCards, trumpSuit } = useSelector(
    state => mapStateToProps(state, { card }),
    isEqual,
  );

  const canDrag = () => some(hand, isEqual(card));
  const begin = () => {
    const selectedAndDraggingCards = uniqueCards(concat(selectedCards, card));
    if (sameRank(selectedAndDraggingCards)) {
      dispatch(actions.game.selectedCards.set(selectedAndDraggingCards));
      return;
    }

    dispatch(actions.game.selectedCards.clear());
  };
  const end = () => {
    dispatch(actions.game.selectedCards.clear());
  };

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', card },
    begin,
    canDrag,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end,
  });

  // TODO: move logic into action
  const onClick = () => {
    if (!selectedCard) {
      if (!find(hand, isEqual(card))) return;

      dispatch(actions.game.selectedCards.add(card));
      return;
    }
    dispatch(actions.game.selectedCards.remove(selectedCard));
  };

  return (
    <Wrapper
      className="Card"
      onClick={onClick}
      ref={dragRef}
      isDragging={isDragging}
      card={card}
      flipped={flipped}
      trumpSuit={trumpSuit}
    >
      {!!selectedCard && <SelectionIndicator />}
    </Wrapper>
  );
};

Card.propTypes = {
  card: PropTypes.oneOf(allCards),
  flipped: PropTypes.bool,
};

Card.defaultProps = {
  card: null,
  flipped: false,
};

export default Card;
