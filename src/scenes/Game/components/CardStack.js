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

import { getDefender } from 'reducers';
import { canDefend } from 'utils/gameLogic';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  (_, props) => props.children,

  (state, children) => ({
    topCard: get(
      last(React.Children.toArray(children)),
      'props.cardOrStack.card',
    ),
    isDefended: React.Children.count(children) > 1,
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
  const io = useWebSocketContext();

  const {
    isDefended,
    isDefender,
    selectedCards,
    topCard,
    trumpSuit,
  } = useSelector(state => mapStateToProps(state, { children }), isEqual);

  const drop = ({ card }) => {
    io.send('defended', { baseCard: topCard, card });
  };

  const canDefendWithCard = card => {
    if (isDefended) return false;
    if (!isDefender) return false;

    return canDefend({
      attackCard: topCard,
      defenseCard: card,
      trumpSuit,
    });
  };

  const canDrop = ({ card }) => canDefendWithCard(card);

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
