import React from 'react';
import { render } from '@testing-library/react';
import { Context } from 'store';

export const renderWithStore = (children, value) => {
  return render(<Context.Provider value={value}>{children}</Context.Provider>);
};
