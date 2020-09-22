import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { Card as UICard, Header, Segment } from 'semantic-ui-react';

import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

import actions from 'actions';
import client from 'utils/client';

import GameLink from './GameLink';

// TODO move to utils
const maxAgeInSeconds = 1;
const getAgeInSeconds = createdAt =>
  (new Date().getTime() - new Date(createdAt).getTime()) / 1000;

const mapStateToProps = createSelector(
  state => state,

  state => ({
    gameList: state.gameList,
    user: state.user,
  }),
);

const GameList = ({ history }) => {
  const dispatch = useDispatch();

  const { gameList, user } = useSelector(mapStateToProps, isEqual);

  React.useEffect(() => {
    if (!user) return;
    if (gameList !== null) return;

    client.get('games/me').then(response => {
      const games = response.data;

      const gameToJoin = find(games, game => {
        if (!game.players.includes(user)) return false;

        return getAgeInSeconds(game.createdAt) < maxAgeInSeconds;
      });

      if (gameToJoin) {
        history.push(`/${gameToJoin.slug}`);
        return;
      }

      dispatch(actions.home.gameList.set(response.data));
    });
  }, [history, dispatch, gameList, user]);

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

export default withRouter(GameList);
