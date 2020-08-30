import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card as UICard } from 'semantic-ui-react';

import reject from 'lodash/reject';

const GameLink = ({ history, players, slug }) => {
  const user = useSelector(state => state.user);

  const enterGame = () => {
    history.push(`/${slug}`);
  };

  const description = () => {
    const opponents = reject(players, player => player === user).join(', ');

    return `vs ${opponents}`;
  };

  return (
    <UICard
      className="GameLink"
      description={description}
      onClick={enterGame}
    />
  );
};

export default withRouter(GameLink);

GameLink.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string.isRequired,
};

GameLink.defaultProps = {
  players: [],
};