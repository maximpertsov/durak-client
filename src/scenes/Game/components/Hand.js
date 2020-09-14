import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { getHands } from 'reducers';
import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    cards: get(getHands(state), state.user, []).map(card => ({ card })),
  }),
);

const Hand = () => {
  const io = useWebSocketContext();
  const { cards } = useSelector(mapStateToProps, isEqual);

  return (
    <div className="Hand">
      <Cards cards={cards} />
      <div>Organize cards</div>
      <Button
        content="By rank"
        onClick={() => {
          io.send('organized', { strategy: 'group_by_rank' });
        }}
      />
      <Button content="By suit" />
      <Button content="By rank and trump" />
    </div>
  );
};

export default Hand;
