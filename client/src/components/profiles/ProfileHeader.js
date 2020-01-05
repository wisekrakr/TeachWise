import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ListGroup, Button } from "reactstrap";

import { addFollow, removeFollow } from "../../actions/ProfileState";

const ProfileHeader = ({
  auth,
  profile: { profile },
  addFollow,
  removeFollow
}) => {
  const toFollowOrNotToFollow = () => {
    if (
      profile.connection.followers.filter(
        follow => follow.profile.toString() === auth.user._id
      ).length === 0
    ) {
      return (
        <Button
          onClick={() => addFollow(profile._id)}
          className="btn draw-border "
        >
          Follow
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => removeFollow(profile._id)}
          className="btn draw-border "
        >
          Unfollow
        </Button>
      );
    }
  };

  return (
    <div className="header-buttons">
      {auth.user._id === profile.user._id ? (
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
  removeFollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { addFollow, removeFollow })(
  ProfileHeader
);
