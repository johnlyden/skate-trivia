import React from 'react';
import { container } from './Layout.module.scss';
import Div100vh from 'react-div-100vh';

function Layout(props) {
  const { children } = props;

  return (
    <Div100vh>
      <div className={container}>{children}</div>
    </Div100vh>
  );
}

export default Layout;
