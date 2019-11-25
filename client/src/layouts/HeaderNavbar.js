import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

import { logoutUser } from "../actions/AuthState";

const HeaderNavbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const [state, setState] = useState({});

  const toggle = () => {
    setState({
      isOpen: !state.isOpen
    });
  };

  const authLinks = (
    <Nav className="m-auto custom-nav" navbar>
      <NavItem>
        <Link to="/dashboard" className="a-link">
          <i className="fas fa-home" /> Dashboard
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/profiles/:id" className="a-link">
          <i className="fas fa-user" /> Profile
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/profiles/classmates/:id" className="a-link">
          <i className="fas fa-users" /> Classmates
        </Link>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className="m-auto custom-nav" navbar>
      <NavItem>
        <Link to="/profiles" className="a-link">
          <i className="fas fa-user" /> Profiles
        </Link>
      </NavItem>
    </Nav>
  );

  return (
    <Navbar dark expand="md" className="header-navbar mb-5" id="navbar">
      <NavbarBrand href="/"> WiseStudyList </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={state.isOpen} navbar>
        {isAuthenticated ? authLinks : guestLinks}
      </Collapse>
    </Navbar>
  );
};

HeaderNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(HeaderNavbar);
