import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import last from 'lodash/last';

import actions from 'actions';

const CardWrapper = styled.div(props => ({
  opacity: props.isOver ? '30%' : '100%',
  marginTop: props.index === 0 ? '0%' : '-100%',
}));

const CardStack = ({ children }) => {
  const dispatch = useDispatch();

  const handleDrop = ({ suit, rank }) => {
    // YUCK
    const baseCard = last(React.Children.toArray(children)).props.cardOrStack;

    dispatch(actions.game.table.stack({ baseCard, card: { rank, suit } }));
    dispatch(actions.game.hand.remove({ suit, rank }));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: item => {
      handleDrop(item);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const renderCards = () => children.map((card, index) => (
    <CardWrapper key={index} isOver={isOver} index={index} ref={dropRef}>
      {card}
    </CardWrapper>
  ));

  return <div className="CardStack">{renderCards()}</div>;
};

export default CardStack;
