import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Jumbotron, Container } from "reactstrap";

import ItemModal from "../../components/items/ItemModal";
import StudyFieldModal from "../../components/fields/StudyFieldModal";
import LogEntryModal from "../../components/logs/LogEntryModal";

const ProfileMain = ({
  profile: {
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <Fragment>
      <Jumbotron fluid className="jumbo-profile">
        <Container fluid>
          <img className="round-img my-1" src={avatar} alt="" />
          <h1 className="large">{name}</h1>

          <p>{location && <span>{location}</span>}</p>
          <div className="icons my-1">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </div>
          <div>
            <ItemModal />
            <StudyFieldModal />
            <LogEntryModal />
          </div>
        </Container>
      </Jumbotron>
    </Fragment>
  );
};

ProfileMain.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileMain;
