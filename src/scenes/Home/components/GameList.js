import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Card as UICard, Header, Segment } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';

import actions from 'actions';
import client from 'utils/client';

import GameLink from './GameLink';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    gameList: state.gameList,
    user: state.user,
  }),
);

const GameList = () => {
  const dispatch = useDispatch();

  const { gameList, user } = useSelector(mapStateToProps, isEqual);

  React.useEffect(() => {
    if (!user) return;
    if (gameList !== null) return;

    client.get('games/me').then(response => {
      dispatch(actions.home.gameList.set(response.data));
    });
  }, [dispatch, gameList, user]);

  const renderGameList = () =>
    gameList.map(({ players, slug, variant }) => (
      <GameLink key={slug} players={players} slug={slug} variant={variant} />
    ));

  if (!user) return null;
  if (gameList === null) return null;

  return (
    <Segment className="GameList">
      <Header>Games In Play</Header>
      <UICard.Group centered>{renderGameList()}</UICard.Group>
    </Segment>
  );
};

export default GameList;
