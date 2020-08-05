import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  height: '100%',
  overflowY: 'scroll',
  textAlign: 'left',
});

const Messages = () => {
  const messages = useSelector(state => state.messages);

  const renderMessages = () =>
    messages.map(message => (
      <div>
        {message.user}
        {' '}
        {message.type}
      </div>
    ));

  return <Wrapper>{renderMessages()}</Wrapper>;
};

export default Messages;
