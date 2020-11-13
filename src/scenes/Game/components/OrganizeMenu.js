import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Label, Segment } from 'semantic-ui-react';

import isEqual from 'lodash/fp/isEqual';

import SelectedOptionButtons from 'components/SelectedOptionButtons';
import { getOrganizeStrategy } from 'reducers';
import { withWebSocket } from 'utils/websockets';

const CenteredSegment = styled(Segment)`
  &&& {
    margin: 10px auto;
  }
`;

const mapStateToProps = createSelector(
  state => state,

  state => ({
    organizeStrategy: getOrganizeStrategy(state),
  }),
);

const OrganizeMenu = ({ io }) => {
  const { organizeStrategy } = useSelector(mapStateToProps, isEqual);

  const organize = strategy => {
    io.send('organized', { strategy });
  };

  return (
    <CenteredSegment compact>
      <Label attached="top">Organize cards</Label>
      <SelectedOptionButtons
        basic
        size="small"
        widths="4"
        activeValueChildrenPairs={[
          ['no_sort', 'Unsorted'],
          ['group_by_rank', 'By rank'],
          ['group_by_suit', 'By suit'],
          ['group_by_rank_and_trump', 'By rank and trump'],
        ]}
        currentValue={organizeStrategy}
        setValue={organize}
      />
    </CenteredSegment>
  );
};

export default withWebSocket(OrganizeMenu);
