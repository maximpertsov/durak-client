import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/fp/isEqual';

import actions from 'actions';
import VariantOptionButton from 'components/VariantOptionButton';
import { getNewGameFeatureFlag } from 'reducers';
import client from 'utils/client';

const FormWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
`;

const mapStateToProps = createSelector(() => ({
  newGameFeatureFlag: getNewGameFeatureFlag(),
}));

const NewGameLink = ({ history }) => {
  const dispatch = useDispatch();
  const { newGameFeatureFlag } = useSelector(mapStateToProps, isEqual);

  const [lowestRank, setLowestRank] = React.useState('6');
  const [attackLimit, setAttackLimit] = React.useState(6);
  const [withPassing, setWithPassing] = React.useState(true);
  // const [playerCount, setPlayerCount] = React.useState(4);

  const createGameRequest = () => {
    // TODO: add player count option
    client
      .post('game/request', {
        parameters: { player_count: 3 },
        variant: {
          withPassing,
          lowestRank,
          attackLimit,
        },
      })
      .then(() => {
        dispatch(actions.home.gameRequests.set(null));
      });
  };

  if (!newGameFeatureFlag) return null;

  return (
    <UICard className="GameLink">
      <UICard.Content>
        <UICard.Description>New Game</UICard.Description>
      </UICard.Content>
      <UICard.Content extra>
        <FormWrapper>
          <div>Passing?</div>
          <VariantOptionButton
            size="tiny"
            activeValue
            currentValue={withPassing}
            setValue={setWithPassing}
          >
            Yes
          </VariantOptionButton>
          <VariantOptionButton
            size="tiny"
            activeValue={false}
            currentValue={withPassing}
            setValue={setWithPassing}
          >
            No
          </VariantOptionButton>
          <div>Lowest rank</div>
          <VariantOptionButton
            size="tiny"
            activeValue="6"
            currentValue={lowestRank}
            setValue={setLowestRank}
          >
            Six
          </VariantOptionButton>
          <VariantOptionButton
            size="tiny"
            activeValue="2"
            currentValue={lowestRank}
            setValue={setLowestRank}
          >
            Two
          </VariantOptionButton>
          <div>Attack limit</div>
          <VariantOptionButton
            size="tiny"
            activeValue={6}
            currentValue={attackLimit}
            setValue={setAttackLimit}
          >
            Six cards
          </VariantOptionButton>
          <VariantOptionButton
            size="tiny"
            activeValue={100}
            currentValue={attackLimit}
            setValue={setAttackLimit}
          >
            Unlimited
          </VariantOptionButton>
        </FormWrapper>
      </UICard.Content>
      <UICard.Content extra>
        <Button size="tiny" fluid onClick={createGameRequest}>
          Create
        </Button>
      </UICard.Content>
    </UICard>
  );
};
export default withRouter(NewGameLink);
