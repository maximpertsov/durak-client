import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import first from 'lodash/first';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  (_, props) => props.children,

  (state, children) => ({
    topCard: get(
      last(React.Children.toArray(children)),
      'props.cardOrStack.card',
    ),
    legalDefenses: get(last(state.messages), 'toState.legalDefenses', {}),
    selectedCards: state.selectedCards,
  }),
);

const CardWrapper = styled.div(props => ({
  opacity: props.isOver ? '30%' : '100%',
  marginTop: props.index === 0 ? '0%' : '-100%',
}));

const CardStack = ({ children }) => {
  const io = useWebSocketContext();

  const { legalDefenses, selectedCards, topCard } = useSelector(
    state => mapStateToProps(state, { children }),
    isEqual,
  );

  const canDefendWithCard = card =>
    get(legalDefenses, topCard, []).includes(card);

  const canDrop = ({ card }) => canDefendWithCard(card);

  const drop = ({ card }) => {
    io.send('defended', { baseCard: topCard, card });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const defendWithSelectedCard = () => {
    if (size(selectedCards) === 1) {
      const card = first(selectedCards);

      if (canDefendWithCard(card)) {
        io.send('defended', { baseCard: topCard, card });
      }
    }
    // HACK: No need clear cards since clicking the table also clears cards
  };

  const renderCards = () =>
    React.Children.toArray(children).map((card, index) => (
      <CardWrapper
        key={index}
        onClick={defendWithSelectedCard}
        isOver={isOver}
        index={index}
        ref={dropRef}
      >
        {card}
      </CardWrapper>
    ));

  return <div className="CardStack">{renderCards()}</div>;
};

export default CardStack;
