import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Card as UICard, Header, Segment } from 'semantic-ui-react';

import flatten from 'lodash/flatten';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

import actions from 'actions';
import { getNewGameFeatureFlag } from 'reducers';
import client from 'utils/client';

import GameRequest from './GameRequest';
import NewGameLink from './NewGameLink';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    newGameFeatureFlag: getNewGameFeatureFlag(),
    gameRequests: state.gameRequests,
    user: state.user,
  }),
);

const Wrapper = styled.div`
  align-items: start;
  column-gap: 10px;
  display: grid;
  justify-items: start;
  grid-template-columns: 1fr 3fr;
  row-gap: 10px;
`;

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
      dispatch(actions.home.gameRequests.set(sortBy(response.data, ['id'])));
    });
  }, [dispatch, gameRequests, user]);

  const renderGameRequests = () =>
    flatten([
      gameRequests.map(({ id, players, variant }) => (
        <GameRequest id={id} players={players} variant={variant} />
      )),
    ]);

  if (!newGameFeatureFlag) return null;
  if (!user) return null;
  if (gameRequests === null) return null;

  return (
    <Segment className="GameRequests">
      <Header>Game Requests</Header>
      <Wrapper>
        <NewGameLink />
        <UICard.Group centered>{renderGameRequests()}</UICard.Group>
      </Wrapper>
    </Segment>
  );
};

export default GameRequests;
