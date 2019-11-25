import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron, ListGroup } from "reactstrap";

import TickerList from "../background/ticker/TickerList";
import SideBar from "../layouts/SideBar";

const Main = ({ auth: { user } }) => {
  return (
    <Fragment>
      <Jumbotron
        className="main jumbo"
        id="top main"
        style={{ paddingTop: "2rem" }}
      >
        <h3 className="large-heading text-center">
          {user ? `Welcome ${user.name}` : ""}{" "}
        </h3>

        <ListGroup
          style={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        ></ListGroup>
      </Jumbotron>
      <TickerList />
      <SideBar />
      <div className="index-container"></div>
    </Fragment>
  );
};

Main.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  // profile: state.profile
});

export default connect(mapStateToProps, null)(Main);
