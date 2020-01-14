import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ListGroup, Button } from "reactstrap";

import {
  addFollow,
  removeFollow,
  addFollowing,
  removeFollowing
} from "../../actions/ProfileState";

const ProfileHeader = ({
  auth: { user },
  profile: { profile },
  addFollow,
  removeFollow,
  addFollowing,
  removeFollowing
}) => {
  function refreshPage() {
    return window.parent.location.reload();
  }
  const onFollow = () => {
    console.log(profile.user._id);
    addFollow(profile.user._id);
    addFollowing(profile.user._id);
    refreshPage();
  };
  const onUnfollow = () => {
    removeFollow(profile.user._id);
    removeFollowing(profile.user._id);
    refreshPage();
  };

  const toFollowOrNotToFollow = () => {
    if (
      profile.connection.followers.filter(
        follow => follow.profile.toString() === user._id
      ).length === 0
    ) {
      return (
        <Button onClick={onFollow} className="btn draw-border ">
          Follow
        </Button>
      );
    } else {
      return (
        <Button onClick={onUnfollow} className="btn draw-border ">
          Unfollow
        </Button>
      );
    }
  };

  return (
    <div className="header-buttons">
      {user._id === profile.user._id ? (
        <ListGroup className=" m-auto">
          <Link to="/profile-edit" className="btn draw-border">
            Edit your profile
          </Link>
          <Link to="/profile-add-education" className="btn draw-border ">
            Add an Education
          </Link>
        </ListGroup>
      ) : (
        <ListGroup className=" m-auto">{toFollowOrNotToFollow()}</ListGroup>
      )}
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  addFollowing: PropTypes.func.isRequired,
  removeFollowing: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  addFollow,
  removeFollow,
  addFollowing,
  removeFollowing
})(ProfileHeader);
