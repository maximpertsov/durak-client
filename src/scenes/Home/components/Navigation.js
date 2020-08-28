import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Menu } from 'semantic-ui-react';

import actions from 'actions';
import logout from 'actions/logout';

const Navigation = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const enterLobby = () => {
    dispatch(actions.home.gameList.set(null));
    history.push('/');
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="Navigation">
      <Menu size="large" borderless>
        <Menu.Item onClick={enterLobby}>Lobby</Menu.Item>
        <Menu.Menu position="right">
          {user && (
            <Menu.Item>
              <Icon name="user" size="big" />
              {user}
            </Menu.Item>
          )}
          {user && (
            <Menu.Item>
              <Button basic fluid onClick={logoutUser} icon>
                <Icon name="log out" />
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default withRouter(Navigation);
