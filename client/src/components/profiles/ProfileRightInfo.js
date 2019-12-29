import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Education from "./profile-extra/Education";
import Spinner from "../../background/Spinner";
import { textTrimmer } from "../../helpers/text";

const ProfileRightInfo = ({ auth, profile: { profile } }) => {
  return auth.user !== null ? (
    <Fragment>
      <div className="right col-lg-8">
        <h6 className="text-center x-small-heading">
          {textTrimmer(profile.user.name)}s Bio
        </h6>
        <p>{profile.bio}</p>
        <div className="heading-underline" />

        <h6 className="text-center x-small-heading">
          {textTrimmer(profile.user.name)}s Skill Set
        </h6>
        <div className="skills" style={{ display: "flex" }}>
          {profile.skills.map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fas fa-check" /> {skill}
            </div>
          ))}
        </div>
        <div className="heading-underline" />

        <h6 className="text-center x-small-heading">
          {textTrimmer(profile.user.name)}s Educations
        </h6>
        {profile.education.map(edu => (
          <Education key={edu._id} />
        ))}

        <div className="heading-underline" />
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

ProfileRightInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(ProfileRightInfo);
