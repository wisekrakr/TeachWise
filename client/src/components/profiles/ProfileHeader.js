import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ListGroup, Button } from "reactstrap";

const ProfileHeader = ({ auth, profile: { profile } }) => {
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
        <ListGroup className=" m-auto">
          <Button className="btn draw-border ">Follow</Button>
        </ListGroup>
      )}
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(ProfileHeader);
