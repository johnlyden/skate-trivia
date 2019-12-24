import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Context } from 'store';
import { withFirebase } from 'components/Firebase';
import Button from 'components/Button';
import * as ROUTES from 'constants/routes';
import * as styles from './SignInContainer.module.scss';

import Input from 'components/Input';

export function SignInFormBase({ history, firebase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { dispatch, store } = useContext(Context);

  function onSubmit(event) {
    if (password === '' || email === '') {
      return false;
    }

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // if there is a score and the user hasn't played, then add the score to their
        setEmail('');
        setPassword('');
        history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError(err.message);
      });

    event.preventDefault();
  }

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <Input
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='text'
          label='Email Address'
          required={true}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          label='Password'
          required={true}
        />
      </div>
      {error && <p className='error-message'>{error}</p>}
      <Button disabled={isInvalid} type='submit' data-testid='sign-in-button'>
        Sign In
      </Button>
    </form>
  );
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInForm;
