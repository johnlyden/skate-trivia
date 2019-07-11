import React, { useState } from 'react';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdbreact';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <MDBNavLink to={ROUTES.HOME}>
          <strong className="white-text">Skate Stumpers</strong>
        </MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? (
                <NavigationAuth authUser={authUser} />
              ) : (
                <NavigationNonAuth />
              )
            }
          </AuthUserContext.Consumer>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}

const NavigationAuth = ({ authUser }) => (
  <>
    <MDBNavItem>
      <MDBNavLink to={ROUTES.LANDING}>Landing</MDBNavLink>
    </MDBNavItem>
    <MDBNavItem>
      <MDBNavLink to={ROUTES.HOME}>Home</MDBNavLink>
    </MDBNavItem>
    <MDBNavItem>
      <MDBNavLink to={ROUTES.ACCOUNT}>Account</MDBNavLink>
    </MDBNavItem>
    {!!authUser.roles[ROLES.ADMIN] && (
      <MDBNavItem>
        <MDBNavLink to={ROUTES.ADMIN}>Admin</MDBNavLink>
      </MDBNavItem>
    )}
    <MDBNavItem>
      <SignOutButton />
    </MDBNavItem>
  </>
);

const NavigationNonAuth = () => (
  <>
    <MDBNavItem>
      <MDBNavLink to={ROUTES.LANDING}>Landing</MDBNavLink>
    </MDBNavItem>
    <MDBNavItem>
      <MDBNavLink to={ROUTES.SIGN_IN}>Sign In</MDBNavLink>
    </MDBNavItem>
  </>
);

export default Header;
