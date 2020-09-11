import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Feed } from 'semantic-ui-react';

import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import reject from 'lodash/fp/reject';
import takeRight from 'lodash/fp/takeRight';

import Message from './Message';

// TODO move to utils
const maxAgeInSeconds = 10;
const getAgeInSeconds = createdAt =>
  (new Date().getTime() - new Date(createdAt).getTime()) / 1000;

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  height: '100px',
  margin: '10px 0 0 0',
  textAlign: 'left',
});

const Messages = () => {
  const messages = useSelector(state => state.messages);

  const renderMessages = () =>
    flow(
      filter(({ createdAt }) => getAgeInSeconds(createdAt) < maxAgeInSeconds),
      reject(({ noDisplay }) => noDisplay),
      takeRight(3),
      map(message => <Message key={message.createdAt} message={message} />),
    )(messages);

  return (
    <Wrapper>
      <Feed size="large">{renderMessages()}</Feed>
    </Wrapper>
  );
};

export default Messages;
