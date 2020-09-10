import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Card as UICard } from 'semantic-ui-react';

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
  const [lowestRank, setLowestRank] = React.useState('6');
  const [attackLimit, setAttackLimit] = React.useState(6);
  const [withPassing, setWithPassing] = React.useState(true);

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
export default withRouter(NewGameLink);
