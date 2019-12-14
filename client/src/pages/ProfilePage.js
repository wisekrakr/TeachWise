import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { textTrimmer } from "../helpers/textHelper";
import { getProfileById } from "../actions/ProfileState";
import ProfileMain from "../components/profiles/ProfileMain";
import ProfileInfo from "../components/profiles/ProfileInfo";
import ProfileStudyList from "../components/profiles/profile-lists/ProfileStudyList";
import ProfileStudyFieldList from "../components/profiles/profile-lists/ProfileStudyFieldList";
import LogEntryList from "../components/logs/LogEntryList";
import Spinner from "../background/Spinner";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  item: { items },
  field: { fields },
  auth: { user },
  match
}) => {
  const initialState = {
    activeTab: 1,
    tabNumbers: 4
  };
  const [activeTab, setActiveTab] = useState(initialState);

  let userItems = [];
  let userFields = [];

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const getAllUserProducts = () => {
    items.map(item =>
      item.user === match.params.id ? userItems.push(item) : (item = null)
    );
    fields.map(field =>
      field.user === match.params.id ? userFields.push(field) : (field = null)
    );
  };

  getAllUserProducts();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return profile !== null && user !== null && !loading ? (
    <Fragment>
      <ProfileMain profile={profile} items={userItems} fields={userFields} />

      <div className="profile-container">
        <Nav tabs className="profile-nav">
          <NavItem className="profile-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Info on {textTrimmer(profile.user.name)}
            </NavLink>
          </NavItem>
          <NavItem className="profile-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              {textTrimmer(profile.user.name)}s Studies
            </NavLink>
          </NavItem>
          <NavItem className="profile-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              {textTrimmer(profile.user.name)}s Fields of Study
            </NavLink>
          </NavItem>
          <NavItem className="profile-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
            >
              {textTrimmer(profile.user.name)}s Log Entries
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ProfileInfo profile={profile} />
          </TabPane>
          <TabPane tabId="2">
            <ProfileStudyList items={userItems} user={user} />
          </TabPane>
          <TabPane tabId="3">
            <ProfileStudyFieldList fields={userFields} user={user} />
          </TabPane>
          <TabPane tabId="4">
            <LogEntryList />
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  item: state.item,
  field: state.field,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
