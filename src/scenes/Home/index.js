import React from 'react';
import styled from '@emotion/styled';

import GameList from './components/GameList';
import GameRequests from './components/GameRequests';

const Wrapper = styled.div`
  margin: 10px;
`;

const Home = () => (
  <Wrapper className="Home">
    <GameList />
    <GameRequests />
  </Wrapper>
);

export default Home;
