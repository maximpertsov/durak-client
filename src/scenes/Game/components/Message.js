import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Feed, Label } from 'semantic-ui-react';

import get from 'lodash/get';

import { Emoji } from 'styles';
import { getRank, getSuit } from 'utils/gameLogic';

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

const getCardText = card => {
  const rank = getRank(card);
  const suit = getSuit(card);

  return `${
    Number.isNaN(+rank) ? rank.charAt(0).toUpperCase() : rank
  }${getSuitText(suit)}`;
};

const getIcon = ({ type }) => {
  switch (type) {
    case 'attacked':
    case 'attacked_with_many':
      return Emoji.dagger;
    default:
      return null;
  }
};

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
      return 'collected cards';
    case 'gave_up':
      return `gave up ${String.fromCodePoint(0x1f3f3)}`;
    case 'yielded_attack':
      return `stopped attacking ${String.fromCodePoint(0x1f44d)}`;
    case 'passed':
      return `passed with ${getCardText(payload.card)}`;
    case 'passed_with_many':
      return `passed with ${payload.cards.map(getCardText).join(' ')}`;
    case 'started_game':
      return 'started the game';
    case 'restarted':
      return 'started a new game';
    default:
      return type;
  }
};

const getFullText = ({ user, type, payload }) =>
  `${user} ${getText({ type, payload })}`;

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const EventWrapper = styled(Feed.Event)(({ createdAt }) => {
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
    <EventWrapper createdAt={message.createdAt}>
      <Feed.Label>
        <Label basic circular>
          {getIcon(message)}
        </Label>
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{message.user}</Feed.User>
          {` ${getText(message)}`}
        </Feed.Summary>
      </Feed.Content>
    </EventWrapper>
  );
};

export default Message;
