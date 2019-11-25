import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Form, Input, FormGroup } from "reactstrap";

import { loginUser } from "../actions/AuthState";

const Login = ({ loginUser, isAuthenticated }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = data;

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container style={{ width: "50vw", paddingTop: "2rem" }}>
      <Fragment>
        <h1 className="large-heading heading">Sign In</h1>
        <h3 className="small-heading">
          <i className="fas fa-user" /> Sign Into Your Account
        </h3>
        <Form onSubmit={e => onSubmit(e)}>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
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
