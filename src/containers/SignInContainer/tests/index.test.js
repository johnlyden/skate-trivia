import React from 'react';
import SignInContainer from '../';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SignInContainer', () => {
  it('should sign in the user when the sign in button is clicked', () => {
    const mockFirebase = jest.mock(() => {
      {
        jest.fn();
      }
    });
    const { debug, getByTestId } = render(
      <Router>
        <SignInContainer firebase={mockFirebase} />
      </Router>
    );
    console.log(getByTestId('sign-in-button'));
    // TODO enter the email and password into the inputs
    fireEvent.submit(getByTestId('sign-in-button'));
    debug();
  });
});
