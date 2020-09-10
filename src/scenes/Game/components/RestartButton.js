import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';

import VariantOptionButton from 'components/VariantOptionButton';
import {
  getAttackLimit,
  getLowestRank,
  getPlayers,
  getWithPassing,
} from 'reducers';
import client from 'utils/client';
import { useWebSocketContext } from 'utils/websockets';

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
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
`;

const RestartButton = () => {
  const {
    players,
    lowestRank: lastLowestRank,
    attackLimit: lastAttackLimit,
    withPassing: lastWithPassing,
  } = useSelector(mapStateToProps, isEqual);
  const io = useWebSocketContext();

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
          <VariantOptionButton
            activeValue
            currentValue={withPassing}
            setValue={setWithPassing}
          >
            Yes
          </VariantOptionButton>
          <VariantOptionButton
            activeValue={false}
            currentValue={withPassing}
            setValue={setWithPassing}
          >
            No
          </VariantOptionButton>
          <div>Lowest rank</div>
          <VariantOptionButton
            activeValue="6"
            currentValue={lowestRank}
            setValue={setLowestRank}
          >
            Six
          </VariantOptionButton>
          <VariantOptionButton
            activeValue="2"
            currentValue={lowestRank}
            setValue={setLowestRank}
          >
            Two
          </VariantOptionButton>
          <div>Attack limit</div>
          <VariantOptionButton
            activeValue={6}
            currentValue={attackLimit}
            setValue={setAttackLimit}
          >
            Six cards
          </VariantOptionButton>
          <VariantOptionButton
            activeValue={100}
            currentValue={attackLimit}
            setValue={setAttackLimit}
          >
            Unlimited
          </VariantOptionButton>
        </FormWrapper>
      </UICard.Content>
    </UICard>
  );
};

export default RestartButton;
