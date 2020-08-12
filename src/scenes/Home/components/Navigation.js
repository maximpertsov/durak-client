import React from 'react';
import { useSelector } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';

const Navigation = () => {
  const user = useSelector(state => state.user);

  if (!user) return null;

  return (
    <div className="Navigation">
      <Label basic>
        <Icon name="user" size="big" />
        {user}
      </Label>
    </div>
  );
};

export default Navigation;
