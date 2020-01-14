import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../../background/Spinner";

const ProfileLeftInfo = ({
  auth,
  profile: {
    profile: {
      location,
      avatar,
      website,
      social,
      connection,
      bio,
      user: { name, _id, email }
    }
  },
  item: { user_items },
  field: { user_fields }
}) => {
  return auth.user !== null ? (
    <Fragment>
      <div className="left col-lg-4 m-auto">
        <div className="photo-left">
          <img className="photo" src={avatar} alt="" />
        </div>
        <h4 className="name">{name}</h4>
        <p className="info">{location}</p>
        <p className="info">{email}</p>
        <div className="stats row">
          <div className="stat col-xs-4">
            <p className="number-stat">{connection.followers.length}</p>
            <p className="desc-stat">ClassMates</p>
          </div>
          <div className="stat col-xs-4">
            <p className="number-stat">
              {user_items ? user_items.length : "No Items "}
            </p>
            <p className="desc-stat">Study Items</p>
          </div>
          <div className="stat col-xs-4">
            <p className="number-stat">
              {user_fields ? user_fields.length : "No Fields "}
            </p>
            <p className="desc-stat">Fields of Study </p>
          </div>
        </div>

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
  auth: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  item: state.item,
  field: state.field
});

export default connect(mapStateToProps)(ProfileLeftInfo);
