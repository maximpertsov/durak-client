import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';

import SelectedOptionButtons from 'components/SelectedOptionButtons';
import {
  getAttackLimit,
  getLowestRank,
  getPlayers,
  getWithPassing,
} from 'reducers';
import client from 'utils/client';
import { withWebSocket } from 'utils/websockets';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    players: getPlayers(state),
    lowestRank: getLowestRank(state),
    attackLimit: getAttackLimit(state),
    withPassing: getWithPassing(state),
  }),
);

const FormWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 3fr 7fr;
  row-gap: 10px;
`;

const RestartButton = ({ io }) => {
  const {
    players,
    lowestRank: lastLowestRank,
    attackLimit: lastAttackLimit,
    withPassing: lastWithPassing,
  } = useSelector(mapStateToProps, isEqual);

  const [lowestRank, setLowestRank] = React.useState(lastLowestRank);
  const [attackLimit, setAttackLimit] = React.useState(lastAttackLimit);
  const [withPassing, setWithPassing] = React.useState(lastWithPassing);

  const restartGame = () => {
    client
      .post('game', {
        players: players.map(player => ({ user: player })),
        variant: { lowestRank, attackLimit, withPassing },
      })
      .then(response => {
        const {
          data: { slug },
        } = response;
        io.send('restarted', { game: slug });
      });
  };

  return (
    <UICard fluid>
      <UICard.Content>
        <Button circular size="big" onClick={restartGame}>
          play again
        </Button>
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
            widths="2"
          />
          <div>Attack limit</div>
          <SelectedOptionButtons
            activeValueChildrenPairs={[
              [100, 'Unlimited'],
              [6, 'Six cards'],
            ]}
            currentValue={attackLimit}
            setValue={setAttackLimit}
            basic
            widths="2"
          />
        </FormWrapper>
      </UICard.Content>
    </UICard>
  );
};

export default withWebSocket(RestartButton);
