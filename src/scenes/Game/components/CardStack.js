import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import last from 'lodash/last';

import { canDefend } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

const CardWrapper = styled.div(props => ({
  opacity: props.isOver ? '30%' : '100%',
  marginTop: props.index === 0 ? '0%' : '-100%',
}));

const mapStateToProps = createSelector(
  (_, props) => props && last(React.Children.toArray(props.children)),
  (_, props) => props && React.Children.count(props.children),

  (baseCard, stackSize) => ({
    baseCard: baseCard && baseCard.props.cardOrStack,
    stackSize,
  }),
);

const CardStack = ({ children }) => {
  const io = useWebSocketContext();
  const { baseCard, stackSize } = useSelector(mapStateToProps, { children });

  const drop = ({ suit, rank, player }) => {
    io.send('DEFENDED', { baseCard, card: { suit, rank }, player });
  };

  const canDrop = card => {
    if (stackSize > 1) return false;

    return canDefend({ defenseCard: card, attackCard: baseCard });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const renderCards = () => React.Children.toArray(children).map((card, index) => (
    <CardWrapper key={index} isOver={isOver} index={index} ref={dropRef}>
      {card}
    </CardWrapper>
  ));

  return <div className="CardStack">{renderCards()}</div>;
};

export default CardStack;
