import React from "react";
import logo from "images/skatestompers.png";
import Button from "components/Button";
import Layout from "components/Layout";
import PageTitle from "components/PageTitle";

import * as styles from "./Landing.module.scss";

function Landing() {
  return (
    <div className={styles.landingPage}>
      <Layout>
        <PageTitle>Daily Skate Trivia</PageTitle>
        <div className={styles.logoContainer}>
          <img src={logo} alt="skate stumpers logo" />
        </div>
        <Button to="/quiz">Play now</Button>
        <br />
        <Button to="/signin">Sign In</Button>
        <p style={{ textAlign: "center" }}>New quiz everyday bitch</p>
      </Layout>
    </div>
  );
}

export default Landing;
