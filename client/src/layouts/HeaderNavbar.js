import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <Navbar dark expand="md" className="header-navbar mb-5" id="navbar">
      <Container>
        <NavbarBrand href="/"> StudyList </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={state.isOpen} navbar>
          <Nav className="m-auto custom-nav" navbar>
            <NavItem>
              <Link to="/profiles/:id" className="a-link">
                <i className="fas fa-user" /> Profile
              </Link>
              <Link to="/profiles/classmates/:id" className="a-link">
                <i className="fas fa-users" /> Classmates
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
