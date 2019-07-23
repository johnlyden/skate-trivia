import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from 'components/Pages/Landing';
import SignUpPage from 'components/Pages/SignUp';
import SignInPage from 'components/Pages/SignIn';
import PasswordForgetPage from 'components/Pages/PasswordForget';
import HomePage from 'components/Pages/Home';
import AccountPage from 'components/Pages/Account';
import AdminPage from 'components/Pages/Admin';
import QuizPage from 'components/Pages/QuizPage';
import Header from 'components/Header';

import * as ROUTES from 'constants/routes';
import { withAuthentication } from 'components/Session';

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.QUIZ_PAGE} component={QuizPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
