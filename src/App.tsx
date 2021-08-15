import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/:id" component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
