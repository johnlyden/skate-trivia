import React from 'react';
import { container, footerText } from './Layout.module.scss';
import Div100vh from 'react-div-100vh';

function Layout(props) {
  const { children } = props;

  return (
    <Div100vh>
      <div className={container}>
        {children}
        <p className={footerText}>Photo: Phil Shao by Luke Ogden, 1996</p>
      </div>
    </Div100vh>
  );
}

export default Layout;
