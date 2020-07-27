import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const Wrapper = styled.div({
  backgroundColor: 'green',
  height: '400px',
});

const Table = () => {
  const cards = useSelector(state => state.table, isEqual);

  return (
    <Wrapper className="Table">
      <Cards cards={cards} />
    </Wrapper>
  );
};

export default Table;
