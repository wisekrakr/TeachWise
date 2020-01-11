import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron, Container, ListGroup } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TickerList from "../background/ticker/TickerList";
import SideBar from "../layouts/SideBar";
import StudyList from "../components/items/item-lists/StudyList";
import Spinner from "../background/Spinner";
import { getFollowing } from "../actions/ProfileState";
import ProfileItemSmall from "../components/profiles/ProfileItemSmall";
import ProfileFollowListSmall from "../components/profiles/profile-lists/ProfileFollowListSmall";

const Main = ({
  auth: { user, loading },
  profile: { profile, profiles },
  getFollowing
}) => {
  useEffect(() => {
    getFollowing(user._id);
  }, [getFollowing]);

  return (loading && user === null) || user === undefined ? (
    <Spinner />
  ) : (
    <Fragment>
      <Jumbotron className="main jumbo" id="top main">
        <h3 className="large-heading text-center">
          {user ? `Welcome ${user.name}` : ""}{" "}
        </h3>
      </Jumbotron>
      <TickerList />
      <SideBar />

      <div className="index-container">
        <StudyList />
        <Container>
          <h6 className="text-center small-heading">My Classmates</h6>

          <p className="heading-underline" />
          {profile !== null && profile !== undefined ? (
            <ListGroup>
              <TransitionGroup className="small-friends-list">
                {profiles.map(follow => (
                  <CSSTransition
                    key={follow._id}
                    timeout={500}
                    classNames="fade"
                  >
                    <ProfileItemSmall key={follow._id} profile={follow} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          ) : (
            <Spinner />
          )}
        </Container>
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getFollowing: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getFollowing })(Main);
