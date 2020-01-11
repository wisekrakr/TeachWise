import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getFollowing } from "../../../actions/ProfileState";
import Spinner from "../../../background/Spinner";
import ProfileItemSmall from "../ProfileItemSmall";

const ProfileFollowListSmall = ({
  auth: { user },
  getFollowing,
  profile: { profile, profiles, loading }
}) => {
  useEffect(() => {
    getFollowing(user._id);
  }, [getFollowing, user._id]);

  return !loading && user !== null ? (
    <Container>
      <h6 className="text-center small-heading">My Classmates</h6>

      <p className="heading-underline" />
      {profile !== null && profile !== undefined ? (
        <ListGroup>
          <TransitionGroup className="small-friends-list">
            {profiles.map(follow => (
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
  getFollowing: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getFollowing })(
  ProfileFollowListSmall
);
