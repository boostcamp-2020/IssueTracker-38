import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import IssueMain from './components/IssueMain';
import IssueSearchBar from './components/IssueSearchBar';

import { dummyIssues, dummyDropdownItems } from './dummyData';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <IssueSearchBar />
            <IssueMain issues={dummyIssues} items={dummyDropdownItems} />
          </Route>
          <Route path="/new-issue">
            <Header />
            <h1>임시 이슈 생성 페이지입니다.</h1>
          </Route>
          <Route path="/detail">
            <Header />
            <h1>임시 이슈 상세 페이지입니다.</h1>
          </Route>
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}
