import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Label, Segment } from 'semantic-ui-react';

import compact from 'lodash/compact';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { getHands } from 'reducers';
import { withWebSocket } from 'utils/websockets';

import Cards from './Cards';

const mapStateToProps = createSelector(
  state => state,

  state => ({
    cards: get(getHands(state), state.user, []).map(card => ({ card })),
  }),
);

const groupByRank = io => () => {
  io.send('organized', { strategy: 'group_by_rank' });
};

const groupBySuit = io => () => {
  io.send('organized', { strategy: 'group_by_suit' });
};
const groupByRankAndTrump = io => () => {
  io.send('organized', { strategy: 'group_by_rank_and_trump' });
};

const CenteredSegment = styled(Segment)`
  &&& {
    margin: 10px auto;
  }
`;

const Hand = ({ io }) => {
  const { cards } = useSelector(mapStateToProps, isEqual);

  const renderOrganizeButtons = () => {
    if (isEmpty(compact(cards))) return null;

    return (
      <CenteredSegment compact>
        <Label attached="top">Organize cards</Label>
        <Button.Group basic widths="3">
          <Button content="By rank" onClick={groupByRank(io)} />
          <Button content="By suit" onClick={groupBySuit(io)} />
          <Button
            content="By rank and trump"
            onClick={groupByRankAndTrump(io)}
          />
        </Button.Group>
      </CenteredSegment>
    );
  };

  return (
    <div className="Hand">
      <Cards cards={cards} />
      {renderOrganizeButtons()}
    </div>
  );
};

export default withWebSocket(Hand);
