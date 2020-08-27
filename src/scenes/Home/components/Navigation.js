import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Label } from 'semantic-ui-react';

import logout from 'actions/logout';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const logoutUser = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <div className="Navigation">
      <Label basic>
        <Icon name="user" size="big" />
        {user}
      </Label>
      <Button onClick={logoutUser} icon="log out" />
    </div>
  );
};

export default Navigation;
