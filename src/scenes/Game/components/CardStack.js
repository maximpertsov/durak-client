import React from 'react';
import { useDrop } from 'react-dnd';
import styled from '@emotion/styled';
import last from 'lodash/last';

import { canDefend } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

const CardWrapper = styled.div(props => ({
  opacity: props.isOver ? '30%' : '100%',
  marginTop: props.index === 0 ? '0%' : '-100%',
}));

const CardStack = ({ children }) => {
  const io = useWebSocketContext();

  // YUCK
  const getBaseCard = () => last(React.Children.toArray(children)).props.cardOrStack;

  const drop = ({ suit, rank, player }) => {
    const baseCard = getBaseCard();

    io.send('DEFENDED', { baseCard, card: { suit, rank }, player });
  };

  const canDrop = card => {
    if (React.Children.count(children) > 1) return false;

    const baseCard = getBaseCard();
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
