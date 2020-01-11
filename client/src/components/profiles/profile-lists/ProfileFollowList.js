import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getFollowing } from "../../../actions/ProfileState";
import ProfileItem from "../ProfileItem";
import Spinner from "../../../background/Spinner";

const ProfileFollowList = ({
  getFollowing,
  profile: { profile, profiles, loading }
}) => {
  useEffect(() => {
    if (profile !== null) {
      getFollowing(profile.user._id);
    }
  }, [getFollowing]);

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">My Classmates</h6>

      <p className="heading-underline" />
      {profile !== null && profile !== undefined ? (
        <ListGroup>
          <TransitionGroup className="">
            {profiles.map(follow => (
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
  profile: PropTypes.object.isRequired,
  getFollowing: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getFollowing })(ProfileFollowList);
