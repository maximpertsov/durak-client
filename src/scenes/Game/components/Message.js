import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Comment } from 'semantic-ui-react';

import { getMessageText } from 'utils/message';

// TODO move to utils
const maxAgeInSeconds = 10;
const getAgeInSeconds = createdAt =>
  (new Date().getTime() - new Date(createdAt).getTime()) / 1000;

const getFullText = ({ user, type, payload }) =>
  `${user} ${getMessageText({ type, payload })}`;

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const Wrapper = styled.div(({ createdAt }) => {
  if (getAgeInSeconds(createdAt) < maxAgeInSeconds) {
    return {
      animation: `${fadeOut} ${maxAgeInSeconds}s ease 1 forwards`,
    };
  }
  return {
    opacity: 0,
  };
});

const Message = ({ message }) => {
  const notify = React.useCallback(() => {
    if (window.document.hasFocus()) return;

    // eslint-disable-next-line no-new
    new window.Notification(getFullText(message));
  }, [message]);

  React.useEffect(() => {
    window.document.title = getFullText(message);

    if (!('Notification' in window)) return;

    switch (window.Notification.permission) {
      case 'denied':
        break;
      case 'granted':
        notify();
        break;
      default:
        window.Notification.requestPermission(permission => {
          if (permission !== 'granted') return;

          notify();
        });
    }
  }, [message, notify]);

  return (
    <Wrapper createdAt={message.createdAt}>
      <Comment>
        <Comment.Content>
          <Comment.Text>
            <div>{getFullText(message)}</div>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Wrapper>
  );
};

export default Message;
