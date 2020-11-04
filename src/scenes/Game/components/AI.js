import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import isEqual from 'lodash/fp/isEqual';

import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import { getAIFeatureFlag, getGame, getPlayers } from 'reducers';
import { withWebSocket } from 'utils/websockets';

// TODO: do not hard-code bot users
const BOTS = ['anna', 'vasyl', 'igor', 'grusha'];

const mapStateToProps = createSelector(
  state => state,

  state => ({
    aiFeatureFlag: getAIFeatureFlag(),
    bots: getPlayers(state).filter(
      player => player !== state.user && BOTS.includes(player),
    ),
    game: getGame(),
  }),
);

// TODO: feature flag?
const AI = ({ io }) => {
  const { aiFeatureFlag, bots, game } = useSelector(mapStateToProps, isEqual);

  useEffect(() => {
    if (!aiFeatureFlag) return;
    if (!game) return;
    if (isEmpty(bots)) return;

    const interval = setInterval(() => {
      const bot = sample(bots);
      io.send('polled_for_action', { user: bot });
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [aiFeatureFlag, bots, game, io]);

  return null;
};

export default withWebSocket(AI);
