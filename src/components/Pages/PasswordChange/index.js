import React, { Component } from 'react';

import { withFirebase } from '../../Firebase';
import Input from 'components/Input';
import Button from 'components/Button';
import * as styles from './PasswordChange.module.scss';
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            name='passwordOne'
            value={passwordOne}
            onChange={this.onChange}
            type='password'
            required={true}
            label='password'
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            name='passwordTwo'
            value={passwordTwo}
            onChange={this.onChange}
            type='password'
            required={true}
            label='confirm password'
          />
        </div>
        <Button disabled={isInvalid} type='submit'>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
