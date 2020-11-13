import React from 'react';
import styled from '@emotion/styled';
import { Button, Label, Segment } from 'semantic-ui-react';

import isEmpty from 'lodash/isEmpty';

import { withWebSocket } from 'utils/websockets';

const CenteredSegment = styled(Segment)`
  &&& {
    margin: 10px auto;
  }
`;

const groupByRank = io => () => {
  io.send('organized', { strategy: 'group_by_rank' });
};

const groupBySuit = io => () => {
  io.send('organized', { strategy: 'group_by_suit' });
};
const groupByRankAndTrump = io => () => {
  io.send('organized', { strategy: 'group_by_rank_and_trump' });
};

const OrganizeMenu = ({ cards, io }) => {
  if (isEmpty(cards)) return null;

  return (
    <CenteredSegment compact>
      <Label attached="top">Organize cards</Label>
      <Button.Group basic widths="3">
        <Button content="By rank" onClick={groupByRank(io)} />
        <Button content="By suit" onClick={groupBySuit(io)} />
        <Button content="By rank and trump" onClick={groupByRankAndTrump(io)} />
      </Button.Group>
    </CenteredSegment>
  );
};

export default withWebSocket(OrganizeMenu);
