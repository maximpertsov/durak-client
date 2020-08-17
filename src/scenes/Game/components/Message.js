import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Comment } from 'semantic-ui-react';

// TODO move to utils
const maxAgeInSeconds = 10;
const getAgeInSeconds = createdAt =>
  (new Date().getTime() - new Date(createdAt).getTime()) / 1000;

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

const Message = ({ createdAt, text, user }) => (
  <Wrapper createdAt={createdAt}>
    <Comment>
      <Comment.Content>
        <Comment.Author as="span">{user}</Comment.Author>
        <Comment.Metadata>
          <div>{text}</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  </Wrapper>
);

export default Message;
