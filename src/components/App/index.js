import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from 'components/Pages/Landing';
import SignUpPage from 'components/Pages/SignUp';
import SignInPage from 'components/Pages/SignIn';
import PasswordForgetPage from 'components/Pages/PasswordForget';
import HomePage from 'components/Pages/Home';
import AccountPage from 'components/Pages/Account';
import AdminPage from 'components/Pages/Admin';
import QuizPage from 'components/Pages/QuizPage';

import * as ROUTES from 'constants/routes';
import { withAuthentication } from 'components/Session';

import { Context, initialState, reducer } from 'store';
import fetchContent from 'contentful/request';
import { AnimatedSwitch } from 'react-router-transition';

import './app.css';

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  const { quizContent } = store;

  useEffect(() => {
    if (!quizContent) {
      fetchContent(dispatch);
    }
  }, [quizContent]);

  return (
    <Context.Provider value={{ store, dispatch }}>
      <Router>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.QUIZ_PAGE} component={QuizPage} />
        </AnimatedSwitch>
      </Router>
    </Context.Provider>
  );
}

export default withAuthentication(App);
