import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import actions from 'actions';
import client from 'utils/client';

const mapStateToProps = createSelector(
  (_, props) => props.players,
  (_, props) => props.variant,

  (players, variant) => ({
    playerCount: size(players),
    lowestRankText: `Lowest rank: ${variant.lowestRank}`,
    attackLimitText:
      variant.attackLimit === 6 ? 'Attack limit: 6 cards' : 'No attack limit',
    withPassingText: variant.withPassing ? 'Passing allowed' : 'No passing',
  }),
);

const GameRequest = ({ id, players, variant }) => {
  const dispatch = useDispatch();
  const {
    playerCount,
    lowestRankText,
    attackLimitText,
    withPassingText,
  } = useSelector(
    state => mapStateToProps(state, { players, variant }),
    isEqual,
  );

  const joinGame = () => {
    client.patch(`game/request/${id}`).then(() => {
      dispatch(actions.home.gameList.set(null));
      dispatch(actions.home.gameRequests.set(null));
    });
  };

  return (
    <UICard className="GameRequest">
      <UICard.Content description={`${playerCount} players have joined`} />
      <UICard.Content extra>
        <div>{withPassingText}</div>
        <div>{lowestRankText}</div>
        <div>{attackLimitText}</div>
      </UICard.Content>
      <UICard.Content extra>
        <Button content="Join game" onClick={joinGame} />
      </UICard.Content>
    </UICard>
  );
};

export default GameRequest;

GameRequest.propTypes = {
  id: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.shape().isRequired,
};

GameRequest.defaultProps = {
  players: [],
};
