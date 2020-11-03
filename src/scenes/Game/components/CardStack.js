import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import first from 'lodash/first';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import actions from 'actions';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  (_, props) => props.children,

  (state, children) => ({
    topCard: get(
      last(React.Children.toArray(children)),
      'props.cardOrStack.card',
    ),
    selectedCards: state.selectedCards,
  }),
);

const CardWrapper = styled.div(props => ({
  marginTop: props.marginTop,
  opacity: props.opacity,
}));

const CardStack = ({ children }) => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();

  const { selectedCards, topCard } = useSelector(
    state => mapStateToProps(state, { children }),
    isEqual,
  );

  const defendWithSelectedCard = () => {
    if (size(selectedCards) !== 1) return;

    const card = first(selectedCards);
    io.send('defended', { baseCard: topCard, card });
    dispatch(actions.game.selectedCards.clear());
  };

  const drop = () => {
    defendWithSelectedCard();
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const renderCards = () =>
    React.Children.toArray(children).map((card, index) => (
      <CardWrapper
        key={index}
        marginTop={index === 0 ? '0%' : '-100%'}
        onClick={defendWithSelectedCard}
        opacity={isOver ? '30%' : '100%'}
        ref={dropRef}
      >
        {card}
      </CardWrapper>
    ));

  return <div className="CardStack">{renderCards()}</div>;
};

export default CardStack;
