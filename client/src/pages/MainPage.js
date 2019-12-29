import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron, ListGroup } from "reactstrap";

import TickerList from "../background/ticker/TickerList";
import SideBar from "../layouts/SideBar";
import StudyFieldsList from "../components/fields/StudyFieldsList";
import StudyList from "../components/items/item-lists/StudyList";
import Spinner from "../background/Spinner";

const Main = ({ auth: { user, loading } }) => {
  return (loading && user === null) || user === undefined ? (
    <Spinner />
  ) : (
    <Fragment>
      <Jumbotron className="main jumbo" id="top main">
        <h3 className="large-heading text-center">
          {user ? `Welcome ${user.name}` : ""}{" "}
        </h3>

        <ListGroup
          style={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        ></ListGroup>
      </Jumbotron>
      <TickerList />
      <SideBar />

      <div className="index-container">
        <StudyList />
        <StudyFieldsList />
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Main);
