import 'semantic-ui-css/semantic.min.css';
import 'App.css';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Game from 'scenes/Game';
import Home from 'scenes/Home';
import LoginForm from 'scenes/Home/components/LoginForm';
import Navigation from 'scenes/Home/components/Navigation';

const App = () => (
  <div className="App">
    <Navigation />
    <LoginForm />
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/:game" component={Game} />
    </Router>
  </div>
);

export default App;
