import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Comment } from 'semantic-ui-react';

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
          user={message.user}
          text={`${message.text || message.type}`}
        />
      )),
    )(messages);

  return (
    <Wrapper>
      <Comment.Group size="tiny">{renderMessages()}</Comment.Group>
    </Wrapper>
  );
};

export default Messages;
