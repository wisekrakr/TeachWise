import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Container } from "reactstrap";

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
        <h2 className="x-small-heading ">{name.trim().split(" ")[0]}s Bio</h2>
        <p>{bio}</p>
        <div className="heading-underline" />
      </Container>
    )}
    <Container>
      <h2 className="x-small-heading">
        {name.trim().split(" ")[0]}s Skill Set
      </h2>
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
