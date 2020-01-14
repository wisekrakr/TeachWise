import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getFollowedProfiles } from "../../../actions/ProfileState";
import Spinner from "../../../background/Spinner";
import ProfileItemSmall from "../ProfileItemSmall";

const ProfileFollowListSmall = ({
  auth: { user },
  getFollowedProfiles,
  profile: { profile, followed_profiles, loading }
}) => {
  // useEffect(() => {
  //   getFollowedProfiles(user._id);
  // }, [getFollowedProfiles, user._id]);

  return !loading && user !== null ? (
    <Container>
      <h6 className="text-center small-heading">My Classmates</h6>

      <p className="heading-underline" />
      {profile !== null && profile !== undefined ? (
        <ListGroup>
          <TransitionGroup className="small-friends-list">
            {followed_profiles.map(follow => (
              <CSSTransition key={follow._id} timeout={500} classNames="fade">
                <ProfileItemSmall key={follow._id} profile={follow} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <Spinner />
  );
};

ProfileFollowListSmall.prototypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getFollowedProfiles: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getFollowedProfiles })(
  ProfileFollowListSmall
);
