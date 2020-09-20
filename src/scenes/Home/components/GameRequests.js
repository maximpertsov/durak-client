import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Card as UICard, Header, Segment } from 'semantic-ui-react';

import flatten from 'lodash/flatten';
import isEqual from 'lodash/isEqual';

import actions from 'actions';
import { getNewGameFeatureFlag } from 'reducers';
import client from 'utils/client';

import NewGameLink from './NewGameLink';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    newGameFeatureFlag: getNewGameFeatureFlag(),
    gameRequests: state.gameRequests,
    user: state.user,
  }),
);

const GameRequests = () => {
  const dispatch = useDispatch();

  const { newGameFeatureFlag, gameRequests, user } = useSelector(
    mapStateToProps,
    isEqual,
  );

  React.useEffect(() => {
    if (!user) return;
    if (gameRequests !== null) return;

    client.get('game/request').then(response => {
      dispatch(actions.home.gameRequests.set(response.data));
    });
  }, [dispatch, gameRequests, user]);

  const renderGameRequests = () =>
    flatten([
      <NewGameLink />,
      gameRequests.map(({ players }) => (
        <UICard>
          <UICard.Content extra>
            <div>{players}</div>
          </UICard.Content>
        </UICard>
      )),
    ]);

  if (!newGameFeatureFlag) return null;
  if (!user) return null;
  if (gameRequests === null) return null;

  return (
    <Segment className="GameRequests">
      <Header>Game Requests</Header>
      <UICard.Group centered>{renderGameRequests()}</UICard.Group>
    </Segment>
  );
};

export default GameRequests;
