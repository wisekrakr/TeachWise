import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  Spinner,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Container
} from "reactstrap";

import { getProfileById } from "../actions/ProfileState";
import ProfileMain from "../components/profiles/ProfileMain";
import ProfileInfo from "../components/profiles/ProfileInfo";
import ProfileEducation from "../components/profiles/ProfileEducation";
import StudyList from "../components/items/StudyList";
import StudyFieldsList from "../components/fields/StudyFieldsList";
import LogEntryList from "../components/logs/LogEntryList";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  const initialState = {
    activeTab: 1
  };
  const [activeTab, setActiveTab] = useState(initialState);

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return profile !== null && !loading ? (
    <Fragment>
      <ProfileMain profile={profile} />

      <div className="profile-container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Info on {profile.user.name.trim().split(" ")[0]}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              {profile.user.name.trim().split(" ")[0]}s Studies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              {profile.user.name.trim().split(" ")[0]}s Fields of Study
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
            >
              {profile.user.name.trim().split(" ")[0]}s Log Entries
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ProfileInfo profile={profile} />
          </TabPane>
          <TabPane tabId="2">
            <StudyList />{" "}
          </TabPane>
          <TabPane tabId="3">
            <StudyFieldsList />{" "}
          </TabPane>
          <TabPane tabId="4">
            <LogEntryList />{" "}
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  ) : (
    <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
      Loading...
    </Spinner>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
