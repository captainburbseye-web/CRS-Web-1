import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Rack from './pages/Rack';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Rack} />
        <Route path="/book" component={BookingPage} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
}

export default App;
