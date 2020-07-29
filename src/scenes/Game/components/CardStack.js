import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import last from 'lodash/last';

import actions from 'actions';
import { canDefend } from 'utils/gameLogic';

const CardWrapper = styled.div(props => ({
  opacity: props.isOver ? '30%' : '100%',
  marginTop: props.index === 0 ? '0%' : '-100%',
}));

const CardStack = ({ children }) => {
  const dispatch = useDispatch();

  // YUCK
  const getBaseCard = () => last(React.Children.toArray(children)).props.cardOrStack;

  const drop = ({ suit, rank }) => {
    const baseCard = getBaseCard();

    dispatch(actions.game.table.stack({ baseCard, card: { rank, suit } }));
    dispatch(actions.game.hand.remove({ suit, rank }));
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

  const renderCards = () => children.map((card, index) => (
    <CardWrapper key={index} isOver={isOver} index={index} ref={dropRef}>
      {card}
    </CardWrapper>
  ));

  return <div className="CardStack">{renderCards()}</div>;
};

export default CardStack;
