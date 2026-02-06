import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Rack from './pages/Rack';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Rack} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
}

export default App;
