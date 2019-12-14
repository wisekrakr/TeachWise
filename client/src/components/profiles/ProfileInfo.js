import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

import { textTrimmer } from "../../helpers/TextHelper";

const ProfileInfo = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="profile-about  p-2">
    {bio && (
      <Container>
        <h5 className="text-center small-heading">{textTrimmer(name)}s Bio</h5>
        <p>{bio}</p>
        <div className="heading-underline" />
      </Container>
    )}
    <Container>
      <h5 className="text-center small-heading">
        {textTrimmer(name)}s Skill Set
      </h5>
      <div className="skills" style={{ display: "flex" }}>
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
      <div className="heading-underline" />
    </Container>
  </div>
);

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileInfo;
