import React from 'react';
import { render } from '@testing-library/react';
import { Context } from 'store';

export const renderWithStore = (children, value) => {
  return render(<Context.Provider value={value}>{children}</Context.Provider>);
};

export const mockFirebase = {
  doSignInWithEmailAndPassword: jest.fn(() => {
    return {
      then: jest.fn(() => {
        return {
          catch: jest.fn(() => {}),
        };
      }),
      catch: jest.fn(() => {}),
    };
  }),
  doCreateUserWithEmailAndPassword: jest.fn(() => {
    return {
      then: jest.fn(() => {
        return {
          then: jest.fn(() => {
            return {
              catch: jest.fn(() => {}),
            };
          }),
        };
      }),
      catch: jest.fn(() => {}),
    };
  }),
  doPasswordUpdate: jest.fn(() => {
    return {
      then: jest.fn(() => {
        return {
          catch: jest.fn(() => {}),
        };
      }),
      catch: jest.fn(() => {}),
    };
  }),
  leaderboard: jest.fn(() => {
    return {
      once: jest.fn(() => {}),
    };
  }),
};
