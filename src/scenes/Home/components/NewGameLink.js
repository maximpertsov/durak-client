import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Button, Card as UICard, Label, Segment } from 'semantic-ui-react';

import isEqual from 'lodash/isEqual';
import reject from 'lodash/reject';

const mapStateToProps = createSelector(
  // (state, props) => reject(props.players, player => player === state.user),
  // (_, props) => props.variant,

  // (opponents, variant) => ({
  () => ({
    // opponentsText: `vs ${opponents.join(', ')}`,
    lowestRankText: 'Lowest rank:',
    attackLimitText: 'Attack limit',
    withPassingText: 'Passing allowed',
  }),
);

const FormWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
`;

const VariantOptionButton = ({
  children,
  activeValue,
  currentValue,
  setValue,
}) => {
  const onClick = () => {
    setValue(activeValue);
  };

  return (
    <Button
      size="tiny"
      basic
      active={activeValue === currentValue}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const NewGameLink = ({ history }) => {
  const {
    // opponentsText,
    lowestRankText,
    attackLimitText,
    withPassingText,
  } = useSelector(
    mapStateToProps,
    // state => mapStateToProps(state, { players, variant }),
    isEqual,
  );

  const [lowestRank, setLowestRank] = React.useState('6');
  const [attackLimit, setAttackLimit] = React.useState(6);
  const [withPassing, setWithPassing] = React.useState(true);

  const enterGame = () => {
    // history.push(`/${slug}`);
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
    <UICard className="GameLink">
      <UICard.Content>
        <UICard.Description>New Game</UICard.Description>
      </UICard.Content>
      <UICard.Content extra>
        <FormWrapper>
          <div>Passing?</div>
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
          <div>Lowest rank</div>
          <VariantOptionButton
            active={lowestRank === '2'}
            onClick={setNewLowestRank('2')}
          >
            Two
          </VariantOptionButton>
          <VariantOptionButton
            active={lowestRank === '6'}
            onClick={setNewLowestRank('6')}
          >
            Six
          </VariantOptionButton>
          <div>Attack limit</div>
          <VariantOptionButton
            active={attackLimit === 6}
            onClick={setNewAttackLimit(6)}
          >
            Six cards
          </VariantOptionButton>
          <VariantOptionButton
            active={attackLimit === 100}
            onClick={setNewAttackLimit(100)}
          >
            Unlimited
          </VariantOptionButton>
        </FormWrapper>
      </UICard.Content>
    </UICard>
  );
};
export default withRouter(NewGameLink);

//
// NewGameLink.propTypes = {
//   players: PropTypes.arrayOf(PropTypes.string),
//   slug: PropTypes.string.isRequired,
//   variant: PropTypes.shape().isRequired,
// };
//
// NewGameLink.defaultProps = {
//   players: [],
// };
