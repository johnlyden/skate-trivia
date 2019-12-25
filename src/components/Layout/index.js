import React from 'react';
import { container, footerText } from './Layout.module.scss';
import Div100vh from 'react-div-100vh';
import useMedia from 'use-media';

function Layout(props) {
  const { children } = props;

  const isLargerThanPhone = useMedia({ minWidth: 600 });

  return (
    <Div100vh>
      <div className={container}>
        {!isLargerThanPhone ? (
          children
        ) : (
          <h2
            style={{
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '4px',
            }}
          >
            only available on phones at da moment
          </h2>
        )}
        <p className={footerText}>Photo: Phil Shao by Luke Ogden, 1996</p>
      </div>
    </Div100vh>
  );
}

export default Layout;
