import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { Icon, Menu } from 'semantic-ui-react';

import actions from 'actions';
import logout from 'actions/logout';

const IconWrapper = styled(Icon)`
  &:hover {
    cursor: pointer;
    transform: scale(1.5);
    transition: opacity 0.2s, color 0.2s, transform 0.2s;
  }
`;

const Navigation = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const enterLobby = () => {
    // TODO: define a compound action?
    dispatch(actions.home.gameList.set(null));
    dispatch(actions.messages.clear());
    dispatch(actions.game.remoteDataState.set('NOT_FETCHED'));
    history.push('/');
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="Navigation">
      <Menu size="large" borderless>
        <Menu.Item>
          <IconWrapper
            aria-label="return to lobby"
            title="Return to lobby"
            name="angle left"
            size="large"
            onClick={enterLobby}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          {user && (
            <Menu.Item>
              <Icon name="user" size="big" />
              {user}
            </Menu.Item>
          )}
          {user && (
            <Menu.Item>
              <IconWrapper
                aria-label="sign out"
                title="Sign out"
                name="log out"
                size="large"
                onClick={logoutUser}
              />
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default withRouter(Navigation);
