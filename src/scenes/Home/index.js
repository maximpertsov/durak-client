import React from 'react';

import GameList from './components/GameList';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';

const Home = () => (
  <div className="Home">
    <Navigation />
    <LoginForm />
    <GameList />
  </div>
);

export default Home;
