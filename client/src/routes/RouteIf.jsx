import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import StoreWrapper from '../stores/StoreWrapper';
import Header from '../components/Header';
import DetailMain from '../components/issueDetail/IssueDetailPage';
import IssueMain from '../components/issueList/IssueMain';
import NewIssueMain from '../components/newIssue/NewIssueMain';
import LabelMain from '../components/labelList/container/LabelMain';

export default function RouteIf({ path, exact = false }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (localStorage.getItem('accessToken')) {
          return (
            <Router>
              <Switch>
                <StoreWrapper>
                  <Header />
                  <Route exact path="/" component={IssueMain} />
                  <Route path="/new-issue" component={NewIssueMain} />
                  <Route path="/labelList" component={LabelMain} />
                  <Route path="/detail/:issueId" component={DetailMain} />
                  {/* <Redirect path="*" to="/" /> */}
                </StoreWrapper>
              </Switch>
            </Router>
          );
        }

        return <Redirect to="/login" />;
      }}
    />
  );
}

RouteIf.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  component: PropTypes.shape.isRequired,
};
