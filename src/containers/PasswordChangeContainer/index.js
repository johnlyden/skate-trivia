import React, { useState } from 'react';

import { withFirebase } from 'components/Firebase';
import Input from 'components/Input';
import Button from 'components/Button';

import * as styles from './PasswordChange.module.scss';

export function PasswordChangeFormBase({ firebase }) {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  function onSubmit(event) {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne('');
        setPasswordTwo('');
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

    event.preventDefault();
  }

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <Input
          name='passwordOne'
          value={passwordOne}
          onChange={e => setPasswordOne(e.target.value)}
          type='password'
          required={true}
          label='password'
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name='passwordTwo'
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
          type='password'
          required={true}
          label='confirm password'
        />
      </div>
      <Button
        disabled={isInvalid}
        type='submit'
        data-testid='password-change-button'
      >
        Reset My Password
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangeForm;
