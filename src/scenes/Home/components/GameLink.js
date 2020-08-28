import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card as UICard } from 'semantic-ui-react';

import reject from 'lodash/reject';

import actions from 'actions';

const GameLink = ({ history, players, slug }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const enterGame = () => {
    dispatch(actions.game.id.set(slug));
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
  players: PropTypes.arrayOf([PropTypes.string]),
  slug: PropTypes.string.isRequired,
};

GameLink.defaultProps = {
  players: [],
};
