import React from 'react';
import { Button } from 'semantic-ui-react';

const VariantOptionButton = ({
  children,
  activeValue,
  currentValue,
  setValue,
  size,
}) => {
  const onClick = () => {
    setValue(activeValue);
  };

  return (
    <Button
      active={activeValue === currentValue}
      basic
      onClick={onClick}
      size={size}
    >
      {children}
    </Button>
  );
};

export default VariantOptionButton;
