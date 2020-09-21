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
  grid-template-columns: 3fr 7fr;
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
  const [playerCount, setPlayerCount] = React.useState(4);

  const createGameRequest = () => {
    client
      .post('game/request', {
        parameters: { playerCount },
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
          <Button.Group basic size="tiny" widths="2">
            <VariantOptionButton
              activeValue={false}
              currentValue={withPassing}
              setValue={setWithPassing}
            >
              No
            </VariantOptionButton>
            <VariantOptionButton
              activeValue
              currentValue={withPassing}
              setValue={setWithPassing}
            >
              Yes
            </VariantOptionButton>
          </Button.Group>
          <div>Lowest rank</div>
          <Button.Group basic size="tiny" widths="2">
            <VariantOptionButton
              activeValue="2"
              currentValue={lowestRank}
              setValue={setLowestRank}
            >
              Two
            </VariantOptionButton>
            <VariantOptionButton
              activeValue="6"
              currentValue={lowestRank}
              setValue={setLowestRank}
            >
              Six
            </VariantOptionButton>
          </Button.Group>
          <div>Attack limit</div>
          <Button.Group basic size="tiny" widths="2">
            <VariantOptionButton
              activeValue={100}
              currentValue={attackLimit}
              setValue={setAttackLimit}
            >
              Unlimited
            </VariantOptionButton>
            <VariantOptionButton
              activeValue={6}
              currentValue={attackLimit}
              setValue={setAttackLimit}
            >
              Six cards
            </VariantOptionButton>
          </Button.Group>
          <div>Players</div>
          <Button.Group basic size="tiny" widths="3">
            <VariantOptionButton
              activeValue={2}
              currentValue={playerCount}
              setValue={setPlayerCount}
            >
              2
            </VariantOptionButton>
            <VariantOptionButton
              activeValue={3}
              currentValue={playerCount}
              setValue={setPlayerCount}
            >
              3
            </VariantOptionButton>
            <VariantOptionButton
              activeValue={4}
              currentValue={playerCount}
              setValue={setPlayerCount}
            >
              4
            </VariantOptionButton>
          </Button.Group>
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
