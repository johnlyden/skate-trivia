import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { SignInFormBase as SignInContainer } from "../";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { mockFirebase as firebase } from "utils/testUtils";

describe("SignInContainer", () => {
  afterEach(cleanup);

  describe("when the username and password fields are blank", () => {
    it("should have a disabled submit button", () => {
      const { getByTestId } = render(<SignInContainer firebase={{}} />);
      expect(getByTestId("sign-in-button").disabled).toBe(true);
    });
  });

  describe("when the username and password fields are valid", () => {
    let testUtils;

    beforeEach(() => {
      testUtils = render(<SignInContainer firebase={firebase} />);

      const email = testUtils.getByTestId("email-input");
      const password = testUtils.getByTestId("password-input");

      fireEvent.change(email, { target: { value: "user@test.com" } });
      fireEvent.change(password, { target: { value: "password" } });
    });

    it("should have an enabled submit button", () => {
      expect(testUtils.getByTestId("sign-in-button").disabled).toBe(false);
    });

    it("should sign in the user when sign in button is clicked", () => {
      const signIn = testUtils.getByTestId("sign-in-button");
      fireEvent.click(signIn);

      expect(firebase.doSignInWithEmailAndPassword).toHaveBeenCalledWith(
        "user@test.com",
        "password"
      );
    });
  });
});
