import React from "react";
import "@testing-library/jest-dom/extend-expect";
import SignInContainer from "../";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignInContainer", () => {
  describe("when the username and password fields are blank", () => {
    it("should not log the user in", () => {
      const { getByTestId } = render(
        <Router>
          <SignInContainer firebase={{}} />
        </Router>
      );
      fireEvent.submit(getByTestId("sign-in-button"));
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

  it("should have a disabled submit button when email and password are blank", () => {
    const mockFirebase = jest.fn();
    const { getByTestId } = render(
      <Router>
        <SignInContainer firebase={mockFirebase} />
      </Router>
    );

    expect(getByTestId("sign-in-button")).toHaveAttribute("disabled");
  });
});
