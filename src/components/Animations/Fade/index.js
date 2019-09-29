import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

function Fade({ children }) {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}>
      {children}
    </CSSTransitionGroup>
  );
}

export default Fade;
