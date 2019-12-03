import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      console.log('withAuthorization is mounting');
      // this should be a global listener - its attached and unattached and re-attached
      // whenever user goes between pages that are auth required
      // TODO: this needs to be moved into a hook or something
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log('asdfasdfsdfsdfsdf');
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      console.log('its umounting');
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
