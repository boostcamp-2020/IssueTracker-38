import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import AuthCallback from './components/login/AuthCallback';
import RouteIf from './routes/RouteIf';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/callback" component={AuthCallback} />
        <RouteIf path="*" />
      </Switch>
    </Router>
  );
}
