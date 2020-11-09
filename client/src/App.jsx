import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import StoreWrapper from './stores/StoreWrapper';

import Header from './components/Header';
import DetailMain from './components/issueDetail/IssueDetailPage';
import IssueMain from './components/issueList/IssueMain';
import NewIssueMain from './components/newIssue/NewIssueMain';
import LoginPage from './components/login/LoginPage';
import AuthCallback from './components/login/AuthCallback';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <StoreWrapper>
            <Route exact path="/">
              <Header />
              <IssueMain />
            </Route>
            <Route path="/new-issue">
              <Header />
              <NewIssueMain />
            </Route>
            <Route path="/detail/:issueId">
              <Header />
              <DetailMain />
            </Route>
            <Route path="/callback">
              <AuthCallback />
            </Route>
            <Redirect path="*" to="/" />
          </StoreWrapper>
        </Switch>
      </Router>
    </>
  );
}
