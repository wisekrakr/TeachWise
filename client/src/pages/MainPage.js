import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Jumbotron, ListGroup, Spinner } from "reactstrap";

import TickerList from "../background/ticker/TickerList";
import SideBar from "../layouts/SideBar";
import ProfileEducation from "../components/profiles/ProfileEducation";
import { getCurrentProfile, deleteAccount } from "../actions/ProfileState";
import StudyFieldsList from "../components/fields/StudyFieldsList";
import StudyList from "../components/items/StudyList";
import LogEntryList from "../components/logs/LogEntryList";

const Main = ({
  auth: { user },
  getCurrentProfile,
  deleteAccount,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
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
      <SideBar profile={profile} />

      <div className="index-container">
        <StudyList showAll={true} />
        <StudyFieldsList showAll={true} />
        <LogEntryList />
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Main
);
