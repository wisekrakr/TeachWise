import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Form, Input, FormGroup, InputGroupAddon } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import { loginUser } from "../actions/AuthState";

const Login = ({ loginUser, isAuthenticated }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = newUser;

  const onChange = e =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <Container className="half-container">
        <Fragment>
          <h1 className="large-heading heading">Sign In</h1>
          <h3 className="small-heading">
            <i className="fas fa-user" /> Sign Into Your Account
          </h3>
          <Form onSubmit={e => onSubmit(e)} className="form">
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
                className="custom-input"
                required
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
                minLength="6"
                className="custom-input"
                required
              />
            </FormGroup>
            <Input type="submit" className="btn med-btn" value="Login" />
          </Form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Fragment>
      </Container>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
