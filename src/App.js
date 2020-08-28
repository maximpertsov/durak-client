import 'semantic-ui-css/semantic.min.css';
import 'App.css';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Game from 'scenes/Game';
import Home from 'scenes/Home';

const App = () => (
  <div className="App">
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/:game" component={Game} />
    </Router>
  </div>
);

export default App;
