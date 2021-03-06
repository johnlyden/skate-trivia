import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';
import Input from 'components/Input';
import Button from 'components/Button';
import Layout from 'components/Layout';

import styles from './PasswordForget.module.scss';

const PasswordForgetPage = () => (
  <Layout>
    <h1 className={styles.headline} style={{ marginBottom: '2rem' }}>
      PasswordForget
    </h1>
    <PasswordForgetForm />
  </Layout>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name='email'
          value={this.state.email}
          onChange={this.onChange}
          type='text'
          required={true}
          label='email'
        />
        <div style={{ margin: '16px auto' }}>
          <Button disabled={isInvalid} type='submit'>
            Send Reset
          </Button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <Link
    to={ROUTES.PASSWORD_FORGET}
    tabIndex='0'
    className={StyleSheet.headline}
  >
    Forgot Password?
  </Link>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
