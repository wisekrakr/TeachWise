import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Jumbotron, Container, ListGroup } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TickerList from "../background/ticker/TickerList";
import SideBar from "../layouts/SideBar";
import StudyList from "../components/items/item-lists/ItemsFromClassmatesList";
import Spinner from "../background/Spinner";
import { getFollowedProfiles, getProfileById } from "../actions/ProfileState";
import ProfileItemSmall from "../components/profiles/ProfileItemSmall";

const Main = ({
  auth: { user, loading },
  profile: { profile, followed_profiles },
  getFollowedProfiles,
  getProfileById
}) => {
  useEffect(() => {
    if (user !== undefined && user !== null) {
      getProfileById(user._id);
      getFollowedProfiles(user._id);
    }
  }, [getFollowedProfiles, getProfileById, user]);

  return (loading && user === null) || user === undefined ? (
    <Spinner />
  ) : (
    <Fragment>
      <Jumbotron className="main jumbo" id="top main">
        <h3 className="large-heading text-center">
          {user ? `Welcome ${user.name}` : ""}{" "}
        </h3>
      </Jumbotron>
      {profile !== null && profile !== undefined ? (
        <Fragment>
          <TickerList />
          <SideBar />
          <div className="index-container">
            <StudyList />
            <Container>
              <h6 className="text-center small-heading">My Classmates</h6>

              <p className="heading-underline" />

              <ListGroup>
                <TransitionGroup className="small-friends-list">
                  {followed_profiles !== null && followed_profiles !== undefined
                    ? followed_profiles.map(follow => (
                        <CSSTransition
                          key={follow._id}
                          timeout={500}
                          classNames="fade"
                        >
                          <ProfileItemSmall key={follow._id} profile={follow} />
                        </CSSTransition>
                      ))
                    : null}
                </TransitionGroup>
              </ListGroup>
            </Container>
          </div>{" "}
        </Fragment>
      ) : (
        <div className="container mt-4">
          <Link to="/profile-creation" className="btn draw-border  ">
            <h2 className="heading large-heading">
              Please create a profile before continuing
            </h2>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getFollowedProfiles: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getFollowedProfiles,
  getProfileById
})(Main);
