import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Jumbotron, ListGroup } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div id="index">
      <Jumbotron className="home" id="top">
        <div className="font-weight-lighter" style={{ textAlign: "bottom" }}>
          *use Google Chrome for the best experience
        </div>
        <h1 className="large-heading">Mental Acquisitiveness</h1>
        <h3 className="lead text-center">Your Personal Path To Knowledge</h3>
        <ListGroup
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center"
          }}
        >
          <div
            className="btn-group-vertical mt-6"
            style={{ marginTop: "6rem" }}
          >
            <Link to="/login" className="btn draw-border">
              Login
            </Link>
            <Link to="/register" className="btn draw-border">
              Register
            </Link>
          </div>
        </ListGroup>
      </Jumbotron>
    </div>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
