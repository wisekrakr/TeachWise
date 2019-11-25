import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Form, Input, FormGroup } from "reactstrap";

import { registerUser } from "../actions/AuthState";
import { setAlert } from "../actions/AlertState";

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = data;

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container style={{ width: "50vw", paddingTop: "2rem" }}>
      <Fragment>
        <h1 className="large-heading heading">Sign Up</h1>
        <h3 className="small-heading">
          <i className="fas fa-user" /> Create Your Account
        </h3>
        <Form onSubmit={e => onSubmit(e)}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
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
