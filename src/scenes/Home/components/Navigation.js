import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Label } from 'semantic-ui-react';

import actions from 'actions';
import Cookies from 'js-cookie';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const logout = () => {
    Cookies.remove('sid');
    dispatch(actions.game.user.set(null));
  };

  if (!user) return null;

  return (
    <div className="Navigation">
      <Label basic>
        <Icon name="user" size="big" />
        {user}
      </Label>
      <Button onClick={logout} icon="log out" />
    </div>
  );
};

export default Navigation;
