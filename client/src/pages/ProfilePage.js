import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import { getProfileById } from "../actions/ProfileState";
import ProfileLeftInfo from "../components/profiles/ProfileLeftInfo";
import ProfileRightInfo from "../components/profiles/ProfileRightInfo";
import ProfileHeader from "../components/profiles/ProfileHeader";
import ProfileStudyList from "../components/profiles/profile-lists/ProfileStudyList";
import ProfileStudyFieldList from "../components/profiles/profile-lists/ProfileStudyFieldList";
import LogEntryList from "../components/logs/LogEntryList";
import Spinner from "../background/Spinner";
import { textTrimmer } from "../helpers/text";
import ProfileSideBar from "../layouts/ProfileSideBar";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  item: { items },
  field: { fields },
  auth: { user },
  match,
  history
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

  if (profile === null) {
    return <Spinner />;
  }

  return profile.user._id === match.params.id && !loading ? (
    <Fragment>
      <ProfileSideBar profile={profile} />
      <Container className="container-new">
        <header>
          <ProfileHeader profile={profile} history={history} />{" "}
        </header>
        <div className="row">
          <ProfileLeftInfo
            profile={profile}
            items={userItems}
            fields={userFields}
          />

          <ProfileRightInfo profile={profile} />
        </div>
      </Container>
      <Container className="profile-tabs">
        <Nav tabs className="profile-nav nav">
          <NavItem className="profile-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              {textTrimmer(profile.user.name)}s Studies
            </NavLink>
          </NavItem>
          <NavItem className="profile-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              {textTrimmer(profile.user.name)}s Fields of Study
            </NavLink>
          </NavItem>
          {user._id === profile.user ? (
            <NavItem className="profile-nav-item">
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                {textTrimmer(profile.user.name)}s Log Entries
              </NavLink>
            </NavItem>
          ) : null}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ProfileStudyList items={userItems} user={user} />
          </TabPane>
          <TabPane tabId="2">
            <ProfileStudyFieldList fields={userFields} user={user} />
          </TabPane>
          <TabPane tabId="3">
            <LogEntryList />
          </TabPane>
        </TabContent>
      </Container>
    </Fragment>
  ) : (
    <div style={{ textAlign: "center" }}>
      <Spinner />
      <h2 className="medium-heading heading">
        Have you made a profile yet? If not, press the button
      </h2>
      <Button className="btn draw-border">
        <Link to="/profile-creation" className="custom-link">
          Create Your Profile
        </Link>
      </Button>
    </div>
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
