import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';
import * as styles from './SignInContainer.module.scss';
import Input from 'components/Input';

function SignInFormBase({ history, firebase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function onSubmit(event) {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError({ error: err });
      });

    event.preventDefault();
  }

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
        required={true}
        className={styles.input}
      />
      <Input
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required={true}
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInForm;
