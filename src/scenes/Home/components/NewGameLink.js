import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/fp/isEqual';

import SelectedOptionButtons from 'components/SelectedOptionButtons';
import { getNewGameFeatureFlag } from 'reducers';
import client from 'utils/client';
import { withWebSocket } from 'utils/websockets';

const FormWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 3fr 7fr;
  row-gap: 10px;
`;

const mapStateToProps = createSelector(() => ({
  newGameFeatureFlag: getNewGameFeatureFlag(),
}));

const NewGameLink = ({ io, history }) => {
  const { newGameFeatureFlag } = useSelector(mapStateToProps, isEqual);

  const [lowestRank, setLowestRank] = React.useState('6');
  const [attackLimit, setAttackLimit] = React.useState('six');
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
        io.send('updated_game_requests', {});
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
          <SelectedOptionButtons
            activeValueChildrenPairs={[
              [false, 'No'],
              [true, 'Yes'],
            ]}
            currentValue={withPassing}
            setValue={setWithPassing}
            basic
            size="tiny"
            widths="2"
          />
          <div>Lowest rank</div>
          <SelectedOptionButtons
            activeValueChildrenPairs={[
              ['2', 'Two'],
              ['6', 'Six'],
            ]}
            currentValue={lowestRank}
            setValue={setLowestRank}
            basic
            size="tiny"
            widths="2"
          />
          <div>Attack limit</div>
          <SelectedOptionButtons
            activeValueChildrenPairs={[
              ['hand', 'Cards in hand'],
              ['unlimited', 'No limit'],
              ['six', 'Six cards'],
            ]}
            currentValue={attackLimit}
            setValue={setAttackLimit}
            basic
            size="tiny"
            widths="3"
          />
          <div>Players</div>
          <SelectedOptionButtons
            activeValueChildrenPairs={[
              [2, '2'],
              [3, '3'],
              [4, '4'],
            ]}
            currentValue={playerCount}
            setValue={setPlayerCount}
            basic
            size="tiny"
            widths="3"
          />
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
export default withWebSocket(withRouter(NewGameLink));
