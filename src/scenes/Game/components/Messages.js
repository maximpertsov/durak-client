import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
});

const Messages = () => {
  const messages = useSelector(state => state.messages);

  const renderMessages = () =>
    messages.map(message => <div>{JSON.stringify(message)}</div>);

  return <Wrapper>{renderMessages()}</Wrapper>;
};

export default Messages;
