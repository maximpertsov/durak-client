import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import client from 'utils/client';
import { withWebSocket } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state.user,
  (_, props) => props.players,
  (_, props) => props.variant,

  (user, players, variant) => ({
    playerCount: size(players),
    lowestRankText: `Lowest rank: ${variant.lowestRank}`,
    attackLimitText:
      variant.attackLimit === 'six'
        ? 'Attack limit: 6 cards'
        : 'No attack limit',
    withPassingText: variant.withPassing ? 'Passing allowed' : 'No passing',
    hasJoinedGame: players.includes(user),
  }),
);

const GameRequest = ({ io, id, players, variant }) => {
  const {
    playerCount,
    lowestRankText,
    attackLimitText,
    withPassingText,
    hasJoinedGame,
  } = useSelector(
    state => mapStateToProps(state, { players, variant }),
    isEqual,
  );

  const joinGame = () => {
    client.patch(`game/request/${id}`).then(() => {
      io.send('updated_game_requests', {});
    });
  };

  const renderJoinButton = () => {
    if (hasJoinedGame) return <Button content="Loading" fluid loading />;

    return <Button content="Join game" fluid onClick={joinGame} />;
  };

  return (
    <UICard className="GameRequest">
      <UICard.Content description={`${playerCount} players have joined`} />
      <UICard.Content extra>
        <div>{withPassingText}</div>
        <div>{lowestRankText}</div>
        <div>{attackLimitText}</div>
      </UICard.Content>
      <UICard.Content extra>{renderJoinButton()}</UICard.Content>
    </UICard>
  );
};

export default withWebSocket(GameRequest);

GameRequest.propTypes = {
  id: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.shape().isRequired,
};

GameRequest.defaultProps = {
  players: [],
};
