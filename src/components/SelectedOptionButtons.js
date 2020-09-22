import React from 'react';
import { Button } from 'semantic-ui-react';

const SelectedOptionButton = ({
  children,
  activeValue,
  currentValue,
  setValue,
}) => {
  const onClick = () => {
    setValue(activeValue);
  };

  return (
    <Button active={activeValue === currentValue} onClick={onClick}>
      {children}
    </Button>
  );
};

const SelectedOptionButtons = ({
  activeValueChildrenPairs,
  currentValue,
  setValue,
  ...buttonProps
}) => {
  const renderButtons = () =>
    activeValueChildrenPairs.map(([activeValue, children]) => (
      <SelectedOptionButton
        activeValue={activeValue}
        currentValue={currentValue}
        setValue={setValue}
      >
        {children}
      </SelectedOptionButton>
    ));

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Button.Group {...buttonProps}>
      {renderButtons()}
    </Button.Group>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

export default SelectedOptionButtons;
