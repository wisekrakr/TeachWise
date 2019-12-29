import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Form, Input, FormGroup, InputGroupAddon } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSignature,
  faKey,
  faLock
} from "@fortawesome/free-solid-svg-icons";

import { registerUser } from "../actions/AuthState";
import { setAlert } from "../actions/AlertState";

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = newUser;

  const onChange = e =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register">
      <Container className="half-container">
        <Fragment>
          <h1 className="large-heading heading">Sign Up</h1>
          <h3 className="small-heading">
            <i className="fas fa-user" /> Create Your Account
          </h3>
          <Form onSubmit={e => onSubmit(e)} className="form">
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faSignature} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faKey} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faLock} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <Input type="submit" className="btn med-btn" value="Register" />
          </Form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </Fragment>
      </Container>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
