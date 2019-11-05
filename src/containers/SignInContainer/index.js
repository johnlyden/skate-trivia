import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from 'components/Firebase';
import Button from 'components/Button';
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
        setError(err.message);
      });

    event.preventDefault();
  }

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <Input
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          label="Email Address"
          required={true}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          label="Password"
          required={true}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <Button disabled={isInvalid} type="submit">
        Sign In binch
      </Button>
    </form>
  );
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInForm;
