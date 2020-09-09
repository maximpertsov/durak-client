import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';
import reject from 'lodash/reject';

const mapStateToProps = createSelector(
  (state, props) => reject(props.players, player => player === state.user),
  (_, props) => props.variant,

  (opponents, variant) => ({
    opponentsText: `vs ${opponents.join(', ')}`,
    lowestRankText: `Lowest rank: ${variant.lowestRank}`,
    attackLimitText:
      variant.attackLimit === 6 ? 'Attack limit: 6 cards' : 'No attack limit',
    withPassingText: variant.withPassing ? 'Passing allowed' : 'No passing',
  }),
);

const GameLink = ({ history, players, slug, variant }) => {
  const {
    opponentsText,
    lowestRankText,
    attackLimitText,
    withPassingText,
  } = useSelector(
    state => mapStateToProps(state, { players, variant }),
    isEqual,
  );

  const enterGame = () => {
    history.push(`/${slug}`);
  };

  return (
    <UICard className="GameLink" onClick={enterGame}>
      <UICard.Content>
        <UICard.Description>{opponentsText}</UICard.Description>
      </UICard.Content>
      <UICard.Content extra>
        <div>{withPassingText}</div>
        <div>{lowestRankText}</div>
        <div>{attackLimitText}</div>
      </UICard.Content>
    </UICard>
  );
};

export default withRouter(GameLink);

GameLink.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string.isRequired,
  variant: PropTypes.shape().isRequired,
};

GameLink.defaultProps = {
  players: [],
};
