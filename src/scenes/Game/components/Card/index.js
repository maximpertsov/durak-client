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
import uniqWith from 'lodash/uniqWith';

import actions from 'actions';
import { getDurak, getHands, getTrumpSuit } from 'reducers';
import { cards as allCards, getSuit } from 'utils/gameLogic';

import getCardImage, { getBackOfCard } from './images';

const mapStateToProps = createSelector(
  state => state,
  state => state.selectedCards,
  (_, props) => props.card,

  (state, selectedCards, card) => ({
    durak: getDurak(state),
    hand: get(getHands(state), state.user),
    selectedCard: find(selectedCards, isEqual(card)),
    selectedAndDraggingCards: uniqWith(concat(card, selectedCards), isEqual),
    trumpSuit: getTrumpSuit(state),
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
  const {
    durak,
    hand,
    selectedCard,
    selectedAndDraggingCards,
    trumpSuit,
  } = useSelector(state => mapStateToProps(state, { card }), isEqual);

  const begin = () => {
    dispatch(actions.game.selectedCards.set(selectedAndDraggingCards));
  };
  const end = () => {
    dispatch(actions.game.selectedCards.clear());
  };

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', card },
    begin,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end,
  });

  // TODO: move logic into action
  const onClick = () => {
    if (!durak && !selectedCard) {
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
