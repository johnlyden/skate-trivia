import React, { useState } from "react";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "components/Firebase";
import * as ROUTES from "constants/routes";

import Input from "components/Input";
import Button from "components/Button";

import * as styles from "./SignUpContainer.module.scss";

function SignUpFormBase({ history, firebase, initialData }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  function onSubmit(event) {
    const roles = {};

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
          score: initialData.totalScore || 0,
          roundsPlayed: {
            [initialData.roundId]: initialData.totalScore
          }
        });
      })
      .then(authUser => {
        setUsername("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");
        setError(null);
        history.push(ROUTES.ACCOUNT);
      })
      .catch(err => {
        setError(err.message);
      });

    event.preventDefault();
  }

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <Input
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          label="Full Name"
          required={true}
        />
      </div>
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
          name="passwordOne"
          value={passwordOne}
          onChange={e => setPasswordOne(e.target.value)}
          type="password"
          label="Password"
          required={true}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
          type="password"
          label="Confirm Password"
          required={true}
        />
      </div>
      <Button disabled={isInvalid} type="submit">
        Sign Up
      </Button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpForm;

export { SignUpForm, SignUpLink };
