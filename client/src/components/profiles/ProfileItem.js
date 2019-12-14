import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, CardHeader } from "reactstrap";

import Spinner from "../../background/Spinner";

const ProfileItem = ({ profile }) => {
  return profile.user !== null && profile !== undefined ? (
    <Card className="card secondary">
      <div className="card-main">
        <CardHeader
          tag="h5"
          className="custom-header text-light font-weight-bolder "
          style={{ border: "none" }}
        >
          {profile.user.name}
        </CardHeader>
      </div>

      <div className="card-secondary card-profile">
        <div className="custom-card">
          <img className="card-img " src={profile.avatar} alt="" />

          <Link
            to={`/api/profile/${profile.user._id}`}
            className="btn draw-border profile-view"
          >
            View Profile
          </Link>
        </div>
        <div className="more-info">
          <div className="coords text-center">
            <span>{profile.user.name}</span>
          </div>
          <div className="coords text-center">
            <span>{profile.location}</span>
          </div>

          <div className="stats">
            <div>
              <div className="title">Studies</div>
              <i className="fas fa-book"></i>
              <div className="value">
                {profile.user.metadata.item_count.length}
              </div>
            </div>

            <div>
              <div className="title">Classmates</div>
              <i className="fas fa-users"></i>
              <div className="value">123</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  ) : (
    <Spinner />
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(null)(ProfileItem);
