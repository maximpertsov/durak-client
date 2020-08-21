import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Comment } from 'semantic-ui-react';

import get from 'lodash/get';

// TODO move to utils
const maxAgeInSeconds = 10;
const getAgeInSeconds = createdAt =>
  (new Date().getTime() - new Date(createdAt).getTime()) / 1000;

const suitCodepoints = Object.freeze({
  spades: String.fromCodePoint(0x2660),
  hearts: String.fromCodePoint(0x2665),
  diamonds: String.fromCodePoint(0x2666),
  clubs: String.fromCodePoint(0x2663),
});

const getSuitText = suit => get(suitCodepoints, suit, '');

const getCardText = ({ rank, suit }) =>
  `${Number.isNaN(+rank) ? rank.charAt(0).toUpperCase() : rank}${getSuitText(
    suit,
  )}`;

// eslint-disable-next-line complexity
const getText = ({ type, payload }) => {
  switch (type) {
    case 'attacked':
      return `attacked with ${getCardText(payload.card)}`;
    case 'attacked_with_many':
      return `attacked with ${payload.cards.map(getCardText).join(' ')}`;
    case 'defended':
      return `defended ${getCardText(payload.baseCard)} with ${getCardText(
        payload.card,
      )}`;
    case 'collected':
      return `collected cards ${String.fromCodePoint(0x1f3f3)}`;
    case 'yielded_attack':
      return `stopped attacking ${String.fromCodePoint(0x1f44d)}`;
    case 'passed':
      return `passed with ${getCardText(payload.card)}`;
    case 'passed_with_many':
      return `passed with ${payload.cards.map(getCardText).join(' ')}`;
    default:
      return type;
  }
};

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

    new window.Notification(getText(message));
  }, [message]);

  React.useEffect(() => {
    window.document.title = getText(message);

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
          <Comment.Author as="span">{message.user}</Comment.Author>
          <Comment.Metadata>
            <div>{getText(message)}</div>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
    </Wrapper>
  );
};

export default Message;
