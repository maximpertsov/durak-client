import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import concat from 'lodash/concat';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import some from 'lodash/some';
import uniqBy from 'lodash/uniqBy';
import uniqWith from 'lodash/uniqWith';

import actions from 'actions';

import getCardImage, { getBackOfCard } from './images';

const uniqueCards = cards => uniqWith(cards, isEqual);
const sameRank = cards => size(uniqBy(uniqueCards(cards), 'rank')) === 1;

const mapStateToProps = createSelector(
  state => state,
  state => state.selectedCards,
  (_, props) => props.rank,
  (_, props) => props.suit,

  (state, selectedCards, rank, suit) => ({
    card: { rank, suit },
    hand: state.hands[state.user],
    selectedCard: find(selectedCards, { suit, rank }),
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

const Wrapper = styled.div(({ isDragging, flipped, rank, suit, trumpSuit }) => {
  const cardImage = flipped ? getBackOfCard() : getCardImage({ rank, suit });
  const isGlowing = !flipped && trumpSuit === suit;

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

// TODO: make it so suit and rank can be omitted for hidden cards
const Card = ({ suit, rank, flipped }) => {
  const dispatch = useDispatch();
  const { card, hand, selectedCard, selectedCards, trumpSuit } = useSelector(
    state => mapStateToProps(state, { rank, suit }),
    isEqual,
  );

  const canDrag = () => some(hand, card);
  const begin = () => {
    const selectedAndDraggingCards = uniqueCards(
      concat(selectedCards, card),
    );
    if (sameRank(selectedAndDraggingCards)) {
      dispatch(actions.game.selectedCards.set(selectedAndDraggingCards));
      return;
    }

    dispatch(actions.game.selectedCards.clear());
  };
  const end = () => {
    dispatch(actions.game.selectedCards.clear());
  }

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', suit, rank },
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
      if (!find(hand, card)) return;

      dispatch(actions.game.selectedCards.add(card));
      return;
    }
    dispatch(actions.game.selectedCards.remove(selectedCard));
  };

  return (
    <Wrapper
      className="Card"
      onClick={onClick}
      isDragging={isDragging}
      flipped={flipped}
      suit={suit}
      trumpSuit={trumpSuit}
      rank={rank}
      ref={dragRef}
    >
      {!!selectedCard && <SelectionIndicator />}
    </Wrapper>
  );
};

export default Card;
