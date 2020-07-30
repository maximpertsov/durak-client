import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import Cards from './Cards';

const Hand = () => {
  const username = useSelector(state => state.username, isEqual);
  const cards = useSelector(state => state.hands[username], isEqual);

  return <Cards className="Hand" cards={cards} />;
};

export default Hand;
