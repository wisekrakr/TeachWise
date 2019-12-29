import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Jumbotron, Container, ListGroup } from "reactstrap";
import { connect } from "react-redux";

import Spinner from "../../background/Spinner";

const ProfileMain = ({
  auth,
  profile: {
    location,
    avatar,
    website,
    social,
    user: { name, _id }
  },
  items,
  fields
}) => {
  return auth.user !== null ? (
    <Fragment>
      <Jumbotron fluid className="jumbo-profile">
        <Container fluid>
          <img className="profile-img " src={avatar} alt="" />
          <div className="left">
            <div className="profile-name">
              <h1 className="medium-heading ">{name}</h1>
              <h4 className="medium-heading ">
                {location && <span>{location}</span>}
              </h4>
              <h6 className="medium-heading ">
                {items && <span>{items.length} Study Items Added</span>}
              </h6>
              <h6 className="medium-heading ">
                {fields && <span>{fields.length} Study Fields Created</span>}
              </h6>
            </div>
          </div>

          <div className="right">
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
          </div>
          <Fragment>
            {auth.user._id === _id ? (
              <ListGroup className="flex-row m-auto">
                <Link to="/profile-edit" className="btn draw-border mt-4">
                  Edit your profile
                </Link>
                <Link
                  to="/profile-add-education"
                  className="btn draw-border mt-4 ml-4"
                >
                  Add an Education
                </Link>
              </ListGroup>
            ) : null}
          </Fragment>
        </Container>
      </Jumbotron>
    </Fragment>
  ) : (
    <Spinner />
  );
};

ProfileMain.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileMain);
