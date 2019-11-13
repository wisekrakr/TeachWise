import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

const HeaderNavbar = () => {
  const [state, setState] = useState({});
  //   const [user, setUser] = useState({});
  //   const [isAuthenticated, setAuthentication] = useState({});

  const toggle = () => {
    setState({
      isOpen: !state.isOpen
    });
  };

  return (
    <Navbar color="dark" dark expand="md" className="header-navbar mb-5">
      <Container>
        <NavbarBrand href="/"> StudyList </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/wisekrakr" target="_blank">
                <i className="fab fa-github" /> Github Profile
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
