import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const Hand = () => {
  const cards = useSelector(state => state.hand, isEqual);

  return <Cards className="Hand" cards={cards} />;
};

export default Hand;
