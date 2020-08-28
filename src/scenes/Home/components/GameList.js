import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';

import actions from 'actions';
import client from 'utils/client';

import GameLink from './GameLink';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    game: state.game,
    gameList: state.gameList,
    user: state.user,
  }),
);

const GameList = () => {
  const dispatch = useDispatch();

  const { game, gameList, user } = useSelector(mapStateToProps, isEqual);

  React.useEffect(() => {
    if (!user) return;
    if (game) return;
    if (gameList !== null) return;

    client.get('games/me').then(response => {
      dispatch(actions.home.gameList.set(response.data));
    });
  }, [dispatch, game, gameList, user]);

  const renderGameList = () =>
    gameList.map(({ slug }) => <GameLink key={slug} slug={slug} />);

  if (!user) return null;
  if (game) return null;
  if (gameList === null) return null;

  return <UICard.Group className="GameList">{renderGameList()}</UICard.Group>;
};

export default GameList;
