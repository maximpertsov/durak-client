import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import first from 'lodash/first';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import size from 'lodash/size';

import actions from 'actions';
import { getDefender } from 'reducers';
import { canDefend } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    isDefender: state.user === getDefender(state),
    selectedCards: state.selectedCards,
    trumpSuit: state.trumpSuit,
  }),
);

const CardWrapper = styled.div(props => ({
  opacity: props.isOver ? '30%' : '100%',
  marginTop: props.index === 0 ? '0%' : '-100%',
}));

const CardStack = ({ children }) => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();

  const baseCard = last(React.Children.toArray(children)).props.cardOrStack;
  const isDefended = React.Children.count(children) > 1;

  const { isDefender, selectedCards, trumpSuit } = useSelector(
    mapStateToProps,
    isEqual,
  );

  const drop = ({ suit, rank }) => {
    io.send('defended', { baseCard, card: { suit, rank } });
  };

  const canDrop = card => {
    if (isDefended) return false;
    if (!isDefender) return false;

    return canDefend({
      attackCard: baseCard,
      defenseCard: card,
      trumpSuit,
    });
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

      if (canDrop(card)) {
        io.send('defended', { baseCard, card });
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
