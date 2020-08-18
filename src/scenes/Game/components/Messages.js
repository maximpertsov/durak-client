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
  display: 'flex',
  justifyContent: 'center',
  height: '100px',
});

const Messages = () => {
  const messages = useSelector(state => state.messages);

  const renderMessages = () =>
    fp.flow(
      fp.filter(
        ({ createdAt }) => getAgeInSeconds(createdAt) < maxAgeInSeconds,
      ),
      fp.takeRight(3),
      fp.map(message => (
        <Message
          key={message.createdAt}
          message={message}
        />
      )),
    )(messages);

  return (
    <Wrapper>
      <Comment.Group size="massive">{renderMessages()}</Comment.Group>
    </Wrapper>
  );
};

export default Messages;
