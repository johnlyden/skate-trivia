import React from "react";
import "@testing-library/jest-dom/extend-expect";
import SignInContainer from "../";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignInContainer", () => {
  afterEach(cleanup);
  describe("when the username and password fields are blank", () => {
    it("should have a disabled submit button", () => {
      const { getByTestId } = render(
        <Router>
          <SignInContainer firebase={{}} />
        </Router>
      );
      expect(getByTestId("sign-in-button").disabled).toBe(true);
    });
  });

  describe("when the username and password fields are valid", () => {
    it("should have an enabled submit button", () => {
      const { getByTestId } = render(
        <Router>
          <SignInContainer firebase={{}} />
        </Router>
      );

      const email = getByTestId("email-input");
      const password = getByTestId("password-input");

      fireEvent.change(email, { target: { value: "user@test.com" } });
      fireEvent.change(password, { target: { value: "password" } });

      expect(getByTestId("sign-in-button").disabled).toBe(false);
    });
  });
  // it("should not", () => {
  //   // const firebase = jest.genMockFromModule("components/Firebase").default;
  //   // firebase.doSignInWithEmailAndPassword = jest.fn(() => {
  //   //   console.log("fukkkkk");
  //   // });
  //   const { debug, getByTestId } = render(
  //     <Router>
  //       <SignInContainer firebase={{}} />
  //     </Router>
  //   );
  //   // console.log(getByTestId('sign-in-button'));
  //   debug();
  //   // TODO enter the email and password into the inputs
  //   fireEvent.submit(getByTestId("sign-in-button"));
  //   // expect(firebase.doSignInWithEmailAndPassword).toHaveBeenCalled();
  // });

  // it("should have a disabled submit button when email and password are blank", () => {
  //   const mockFirebase = jest.fn();
  //   const { getByTestId } = render(
  //     <Router>
  //       <SignInContainer firebase={mockFirebase} />
  //     </Router>
  //   );

  //   expect(getByTestId("sign-in-button")).toHaveAttribute("disabled");
  // });
});
