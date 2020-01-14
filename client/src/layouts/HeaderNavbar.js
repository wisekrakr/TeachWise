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
  NavItem
} from "reactstrap";

import { logoutUser } from "../actions/AuthState";

const HeaderNavbar = ({
  auth: { isAuthenticated, loading, user },
  logoutUser
}) => {
  const [state, setState] = useState({});

  const toggle = () => {
    setState({
      isOpen: !state.isOpen
    });
  };

  return isAuthenticated && !loading ? (
    <Navbar dark expand="md" className="header-navbar" id="navbar">
      <NavbarBrand href="/"> Wise </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={state.isOpen} navbar>
        <Nav className="m-auto custom-nav" navbar>
          <NavItem>
            <Link to="/dashboard" className="a-link">
              <i className="fas fa-home" /> Dashboard
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/api/fields" className="a-link">
              <i className="fas fa-university" /> Fields Of Study
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/api/items/me/${user._id}`} className="a-link">
              <i className="fas fa-book" /> My Study Items
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/api/logs" className="a-link">
              <i className="fas fa-upload" /> My Log Entries
            </Link>
          </NavItem>
          <NavItem>
            <Link onClick={logoutUser} to="/" className="a-link nav-btn">
              <i className="fas fa-power-off" aria-hidden="true" /> Logout
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  ) : null;
};

HeaderNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(HeaderNavbar);
