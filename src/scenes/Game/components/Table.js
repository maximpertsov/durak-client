import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import actions from 'actions';

import Cards from './Cards';

const Wrapper = styled.div(props => ({
  backgroundColor: props.isOver ? '#90EE90' : 'green',
  height: '400px',
}));

const Table = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.table, isEqual);

  const handleDrop = ({ suit, rank }) => {
    dispatch(actions.game.table.append({ suit, rank }));
    dispatch(actions.game.hand.remove({ suit, rank }));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: item => {
      handleDrop(item);
    },
    // do not drop when over nested card stack component
    canDrop: (item, monitor) => monitor.isOver({ shallow: true }),
    collect: monitor => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <Wrapper className="Table" isOver={isOver} ref={dropRef}>
      <Cards cards={cards} />
    </Wrapper>
  );
};

export default Table;
