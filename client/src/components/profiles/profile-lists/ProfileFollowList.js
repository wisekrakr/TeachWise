import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getFollowedProfiles } from "../../../actions/ProfileState";
import ProfileItem from "../ProfileItem";
import Spinner from "../../../background/Spinner";

const ProfileFollowList = ({
  auth: { user },
  getFollowedProfiles,
  profile: { profile, followed_profiles, loading }
}) => {
  useEffect(() => {
    if (user !== null && user !== undefined) {
      getFollowedProfiles(user._id);
    }
  }, [getFollowedProfiles, profile, user]);

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">My Classmates</h6>

      <p className="heading-underline" />
      {profile !== null && profile !== undefined ? (
        <ListGroup>
          <TransitionGroup className="">
            {followed_profiles.map(follow => (
              <CSSTransition key={follow._id} timeout={500} classNames="fade">
                <ProfileItem key={follow._id} profile={follow} />
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

ProfileFollowList.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getFollowedProfiles: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getFollowedProfiles })(
  ProfileFollowList
);
