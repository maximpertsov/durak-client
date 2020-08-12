import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import fp from 'utils/lodashFp';

import Message from './Message';

// TODO move to utils
const maxAgeInSeconds = 10;
const getAgeInSeconds = createdAt =>
  (new Date().getTime() - new Date(createdAt).getTime()) / 1000;

const Wrapper = styled.div({
  height: '150px',
  overflow: 'auto',
  textAlign: 'left',
});

const Messages = () => {
  const messages = useSelector(state => state.messages);

  const renderMessages = () =>
    fp.flow(
      fp.filter(
        ({ createdAt }) => getAgeInSeconds(createdAt) < maxAgeInSeconds,
      ),
      fp.map(message => (
        <Message
          key={message.createdAt}
          createdAt={message.createdAt}
          text={`${message.user || ''} ${message.text || message.type}`}
        />
      )),
    )(messages);

  return <Wrapper>{renderMessages()}</Wrapper>;
};

export default Messages;
