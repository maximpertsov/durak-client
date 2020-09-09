import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Card as UICard } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';

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

  const setNewWithPassing = value => () => {
    setWithPassing(value);
  };

  const setNewLowestRank = rank => () => {
    setLowestRank(rank);
  };

  const setNewAttackLimit = limit => () => {
    setAttackLimit(limit);
  };

  return (
    <UICard fluid>
      <UICard.Content>
        <Button circular size="big" onClick={restartGame}>
          play again
        </Button>
      </UICard.Content>
      <UICard.Content extra>
        <div>Passing?</div>
        <Button.Group>
          <Button active={!withPassing} onClick={setNewWithPassing(false)}>
            No
          </Button>
          <Button active={withPassing} onClick={setNewWithPassing(true)}>
            Yes
          </Button>
        </Button.Group>
      </UICard.Content>
      <UICard.Content extra>
        <div>Select lowest rank</div>
        <Button.Group>
          <Button active={lowestRank === '2'} onClick={setNewLowestRank('2')}>
            Two
          </Button>
          <Button active={lowestRank === '6'} onClick={setNewLowestRank('6')}>
            Six
          </Button>
        </Button.Group>
      </UICard.Content>
      <UICard.Content extra>
        <div>Attack limit</div>
        <Button.Group>
          <Button active={attackLimit === 6} onClick={setNewAttackLimit(6)}>
            Six cards
          </Button>
          <Button active={attackLimit === 100} onClick={setNewAttackLimit(100)}>
            Unlimited
          </Button>
        </Button.Group>
      </UICard.Content>
    </UICard>
  );
};

export default RestartButton;
