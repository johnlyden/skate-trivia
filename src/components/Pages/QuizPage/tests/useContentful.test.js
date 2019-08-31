import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useContentful from '../useContentful';
// import client from '../client';
// jest.mock('../client');
import * as dependency from '../client';

describe('useContentful', () => {
  // let initializeClient;
  beforeEach(() => {
    // jest.mock('../client');
    // initializeClient = require('../client');
    // jest.mock('../client', () => ({
    //   initializeClient: jest.fn()
    // }));
    // client.mockImplementation(() => {
    //   jest.fn(() => {
    //     jest.fn();
    //   });
    // });
  });

  it('should initialize the contentful client', () => {
    dependency.default = jest.mock(() => {
      jest.fn();
    });
    console.log(dependency);
    const { result } = renderHook(() => useContentful());
    console.log(result);
    expect(client.initializeClient).toHaveBeenCalled();
  });
});
