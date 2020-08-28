import React from 'react';
import { useDispatch } from 'react-redux';
import { Card as UICard } from 'semantic-ui-react';

import actions from 'actions';

const GameLink = ({ slug }) => {
  const dispatch = useDispatch();

  const enterGame = () => {
    dispatch(actions.game.id.set(slug));
  };

  return <UICard className="GameLink" description={slug} onClick={enterGame} />;
};

export default GameLink;
