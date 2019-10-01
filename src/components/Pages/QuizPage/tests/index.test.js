import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import QuizPage from '..';

const renderComponent = () =>
  render(
    <Router>
      <QuizPage />
    </Router>
  );

describe('<QuizPage />', () => {
  afterEach(() => {
    cleanup();
  });

  // let contentful;

  // beforeEach(() => {
  //   const mocked = jest.fn();
  //   jest.mock('contentful', () => ({
  //     createClient: mocked
  //   }));
  // });
  beforeEach(() => {
    jest.mock('contentful');
  });

  it('should create a client for contentful', () => {
    const mocked = jest.fn();

    jest.mock('contentful', () => ({
      createClient: mocked
    }));
    let contentful = require('contentful').default;

    act(() => {
      renderComponent();
    });

    expect(mocked).toHaveBeenCalled();
  });
});
