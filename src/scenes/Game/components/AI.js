import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import isEqual from 'lodash/fp/isEqual';

import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import { getGame, getPlayers } from 'reducers';
import { withWebSocket } from 'utils/websockets';

// TODO: do not hard-code bot users
const BOTS = ['anna', 'vasyl', 'igor', 'grusha'];

const mapStateToProps = createSelector(
  state => state,

  state => ({
    bots: getPlayers(state).filter(
      player => player !== state.user && BOTS.includes(player),
    ),
    game: getGame(),
  }),
);

// TODO: feature flag?
const AI = ({ io }) => {
  const { bots, game } = useSelector(mapStateToProps, isEqual);

  useEffect(() => {
    console.log('setting up effect hook');
    if (!game) return;
    console.log('game in session');
    if (isEmpty(bots)) return;
    console.log('bots are playing');

    const interval = setInterval(() => {
      const bot = sample(bots);
      console.log('bot action!');
      io.send('polled_for_action', { user: bot });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [bots, game, io]);

  return null;
};

export default withWebSocket(AI);
