import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../../background/Spinner";

const ProfileItemSmall = ({ profile }) => {
  return profile !== undefined && profile !== null ? (
    <div className="small-follow">
      <Link
        to={`/api/profile/${profile.user._id}`}
        className="small-profile-view"
      >
        <img
          className="follow-img "
          src={profile.avatar}
          title={profile.user.name}
        />
      </Link>
    </div>
  ) : (
    <Spinner />
  );
};

export default connect(null)(ProfileItemSmall);
