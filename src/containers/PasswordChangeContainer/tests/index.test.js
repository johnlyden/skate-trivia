import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { PasswordChangeFormBase as PasswordChangeContainer } from '../';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { mockFirebase as firebase } from 'utils/testUtils';

describe('PasswordChangeContainer', () => {
  afterEach(cleanup);

  describe('when any password fields are blank', () => {
    it('should have a disabled submit button', () => {
      const { getByTestId } = render(<PasswordChangeContainer firebase={{}} />);
      expect(getByTestId('password-change-button').disabled).toBe(true);
    });
  });

  describe('when the username and password fields are valid', () => {
    let testUtils;

    beforeEach(() => {
      testUtils = render(<PasswordChangeContainer firebase={firebase} />);

      const passwordOne = testUtils.getByTestId('passwordOne-input');
      const passwordTwo = testUtils.getByTestId('passwordTwo-input');

      fireEvent.change(passwordOne, { target: { value: 'password' } });
      fireEvent.change(passwordTwo, { target: { value: 'password' } });
    });

    it('should have an enabled submit button', () => {
      expect(testUtils.getByTestId('password-change-button').disabled).toBe(
        false
      );
    });

    it('should reset the password when submit button is clicked', () => {
      const signIn = testUtils.getByTestId('password-change-button');
      fireEvent.click(signIn);

      expect(firebase.doPasswordUpdate).toHaveBeenCalledWith('password');
    });
  });
});
