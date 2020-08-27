import 'semantic-ui-css/semantic.min.css';
import 'App.css';

import React from 'react';

import Game from 'scenes/Game';
import Home from 'scenes/Home';

const App = () => (
  <div className="App">
    <Home />
    <Game />
  </div>
);

export default App;
