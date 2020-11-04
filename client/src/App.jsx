import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import StoreWrapper from './stores/StoreWrapper';

import Header from './components/Header';
import DetailMain from './components/issueDetail/DetailMain';
import IssueMain from './components/issueList/IssueMain';
import IssueSearchBar from './components/issueList/IssueSearchBar';
import SideBar from './components/issueDetail/SideBar';

export default function App() {
  return (
    <>
      <StoreWrapper>
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <IssueSearchBar />
              <IssueMain />
            </Route>
            <Route path="/new-issue">
              <Header />
              <h1>임시 이슈 생성 페이지입니다.</h1>
            </Route>
            <Route path="/detail/:issueId">
              <Header />
              <DetailMain />
            </Route>
            <Redirect path="*" to="/" />
          </Switch>
        </Router>
      </StoreWrapper>
    </>
  );
}
