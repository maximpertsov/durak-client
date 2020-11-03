import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';

import compact from 'lodash/compact';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import some from 'lodash/some';

import actions from 'actions';
import { getHands } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,
  state => last(state.messages),

  (state, lastMessage) => ({
    legalPassesCards: get(lastMessage, 'toState.legalPasses.cards', []),
    legalPassesLimit: get(lastMessage, 'toState.legalPasses.limit', 0),
    hand: get(getHands(state), state.user),
    selectedCards: state.selectedCards,
  }),
);

const Wrapper = styled.div(props => ({
  backgroundColor: 'blue',
  height: '40vh',
  margin: '0 0 10px 0',
  opacity: props.isOver ? '90%' : '100%',
  padding: '10px',
  width: '20%',
}));

const PassCards = () => {
  const dispatch = useDispatch();
  const io = useWebSocketContext();
  const {
    hand,
    legalPassesCards,
    legalPassesLimit,
    selectedCards,
  } = useSelector(mapStateToProps, isEqual);

  const canPassWithAnyCard = () => {
    if (legalPassesLimit < 1) return false;

    return some(compact(hand), card => legalPassesCards.includes(card));
  };

  const passWithSelectedCard = () => {
    // TODO: technically we don't need this, since the socket server checks this.
    // That said, having this check is an easy way to prevent sending too many
    // unprocessable messages to the socket server.
    if (isEmpty(selectedCards)) return;

    io.send('passed', { cards: selectedCards });
    dispatch(actions.game.selectedCards.clear());
  };

  const drop = () => {
    passWithSelectedCard();
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  if (!canPassWithAnyCard()) return null;

  return (
    <Wrapper
      className="PassCards"
      onClick={passWithSelectedCard}
      isOver={isOver}
      ref={dropRef}
    >
      <h2>Drop card here to pass</h2>
    </Wrapper>
  );
};

export default PassCards;
