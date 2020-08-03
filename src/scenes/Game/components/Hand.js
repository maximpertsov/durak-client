import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

import { useWebSocketContext } from 'utils/websockets';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,
  state => state.username,

  (state, username) => ({
    cards: state.hands[username],
    hasYielded: state.yielded.includes(username),
    username,
  }),
);

const Hand = () => {
  const io = useWebSocketContext();

  const { cards, hasYielded, username } = useSelector(mapStateToProps, isEqual);

  const yieldAttack = () => {
    io.send('yielded_attack', { user: username });
  };

  return (
    <div className="Hand">
      {!hasYielded && (
        <button type="button" onClick={yieldAttack}>
          done
        </button>
      )}
      <h2>{username}</h2>
      <Cards cards={cards} />
    </div>
  );
};

export default Hand;
