import React from "react";
import { Jumbotron, ListGroup } from "reactstrap";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div id="index">
      <Jumbotron className="home" id="top">
        <div
          className="font-weight-lighter"
          style={{ textAlign: "bottom", paddingTop: "1rem" }}
        >
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
            <Link to="/login" className="btn med-btn">
              Login
            </Link>
            <Link to="/register" className="btn med-btn">
              Register
            </Link>
          </div>
        </ListGroup>
      </Jumbotron>
    </div>
  );
};

export default Index;
