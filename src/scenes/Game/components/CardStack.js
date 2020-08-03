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

  const baseCard = last(React.Children.toArray(children)).props.cardOrStack;
  const isDefended = React.Children.count(children) > 1;

  const drop = ({ suit, rank }) => {
    io.send('defended', { baseCard, card: { suit, rank } });
  };

  const canDrop = card => {
    if (isDefended) return false;

    return canDefend({ attackCard: baseCard, defenseCard: card });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const renderCards = () =>
    React.Children.toArray(children).map((card, index) => (
      <CardWrapper key={index} isOver={isOver} index={index} ref={dropRef}>
        {card}
      </CardWrapper>
    ));

  return <div className="CardStack">{renderCards()}</div>;
};

export default CardStack;
