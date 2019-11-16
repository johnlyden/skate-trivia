import React, { useContext } from "react";

import { AuthUserContext, withAuthorization } from "../../Session";
import Layout from "components/Layout";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { Context } from "store";
const Account = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <Layout>
            <div>
              <h2 style={{ marginBottom: "24px" }}>{authUser.email}</h2>
              {/* <p>Reset your password</p>
              <PasswordForgetForm /> */}
              <p>Change your password</p>
              <PasswordChangeForm />
              {/* <h2>past rounds:</h2>
            {authUser.roundsPlayed &&
              Object.keys(authUser.roundsPlayed).map(round => (
                <h3>
                  {round}: {authUser.roundsPlayed[round]}
                </h3>
              ))} */}
            </div>
          </Layout>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
