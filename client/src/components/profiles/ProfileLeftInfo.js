import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";
import { connect } from "react-redux";

import Spinner from "../../background/Spinner";

const ProfileLeftInfo = ({
  auth,
  profile: {
    location,
    avatar,
    website,
    social,
    bio,
    user: { name, _id, email }
  },
  items,
  fields
}) => {
  return auth.user !== null ? (
    <Fragment>
      <div className="left col-lg-4 m-auto">
        <div className="photo-left">
          <img className="photo" src={avatar} />
        </div>
        <h4 className="name">{name}</h4>
        <p className="info">{location}</p>
        <p className="info">{email}</p>
        <div className="stats row">
          <div className="stat col-xs-4">
            <p className="number-stat">3,619</p>
            <p className="desc-stat">ClassMates</p>
          </div>
          <div className="stat col-xs-4">
            <p className="number-stat">{items ? items.length : "No Items "}</p>
            <p className="desc-stat">Study Items</p>
          </div>
          <div className="stat col-xs-4">
            <p className="number-stat">
              {fields ? fields.length : "No Fields "}
            </p>
            <p className="desc-stat">Fields of Study </p>
          </div>
        </div>
        <p className="desc">{bio}</p>
        <div className="social">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x" />
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x" />
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x" />
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x" />
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
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
    </Fragment>
  ) : (
    <Spinner />
  );
};

ProfileLeftInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileLeftInfo);
