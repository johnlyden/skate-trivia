import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { SignUpFormBase as SignUpContainer } from "../";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { mockFirebase as firebase } from "utils/testUtils";

describe("SignUpContainer", () => {
  afterEach(cleanup);

  describe("when the form fields are blank", () => {
    it("should have a disabled submit button", () => {
      const { getByTestId } = render(<SignUpContainer firebase={{}} />);
      const passwordOne = getByTestId("passwordOne-input");
      const passwordTwo = getByTestId("passwordTwo-input");
      fireEvent.change(passwordOne, { target: { value: "password" } });
      fireEvent.change(passwordTwo, {
        target: { value: "notMatchingpassword" }
      });

      expect(getByTestId("sign-up-button").disabled).toBe(true);
    });
  });

  describe("when the password fields do not match", () => {
    it("should have a disabled submit button", () => {
      const { getByTestId } = render(<SignUpContainer firebase={{}} />);
      expect(getByTestId("sign-up-button").disabled).toBe(true);
    });
  });

  describe("when the form fields are valid", () => {
    let testUtils;

    beforeEach(() => {
      testUtils = render(<SignUpContainer firebase={firebase} />);

      const username = testUtils.getByTestId("username-input");
      const email = testUtils.getByTestId("email-input");
      const passwordOne = testUtils.getByTestId("passwordOne-input");
      const passwordTwo = testUtils.getByTestId("passwordTwo-input");

      fireEvent.change(username, { target: { value: "username" } });
      fireEvent.change(email, { target: { value: "user@test.com" } });
      fireEvent.change(passwordOne, { target: { value: "password" } });
      fireEvent.change(passwordTwo, { target: { value: "password" } });
    });

    it("should have an enabled submit button", () => {
      expect(testUtils.getByTestId("sign-up-button").disabled).toBe(false);
    });

    it("should sign up the user when sign up button is clicked", () => {
      const signUp = testUtils.getByTestId("sign-up-button");
      fireEvent.click(signUp);

      expect(firebase.doCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        "user@test.com",
        "password"
      );
    });
  });
});
