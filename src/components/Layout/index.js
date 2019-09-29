import React from 'react';
import { container } from './Layout.module.scss';

function Layout(props) {
  const { children } = props;

  return <div className={container}>{children}</div>;
}

export default Layout;
