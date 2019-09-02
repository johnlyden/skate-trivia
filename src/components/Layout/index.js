import React from 'react';
import { container } from './Layout.module.css';

function Layout(props) {
  const { children } = props;

  return <div className={container}>{children}</div>;
}

export default Layout;
