import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron, ListGroup } from "reactstrap";

import { getCurrentProfile } from "../actions/ProfileState";
import TickerList from "../background/ticker/TickerList";
import SideBar from "../layouts/SideBar";
import StudyFieldsList from "../components/fields/StudyFieldsList";
import StudyList from "../components/items/StudyList";
import Spinner from "../background/Spinner";

const Main = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && user === null ? (
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
        <StudyList />
        <StudyFieldsList />
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Main);
