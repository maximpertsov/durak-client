import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import fp from 'utils/lodashFp';

import Message from './Message';

const Wrapper = styled.div({
  height: '150px',
  overflow: 'auto',
  textAlign: 'left',
});

const Messages = () => {
  const messages = useSelector(state => state.messages);

  const renderMessages = () =>
    fp.flow(
      fp.takeRight(5),
      fp.map((message, i) => (
        <Message
          key={i}
          text={`${message.user || ''} ${message.text || message.type}`}
        />
      )),
      fp.reverse,
    )(messages);

  return <Wrapper>{renderMessages()}</Wrapper>;
};

export default Messages;
