import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button, Card, CardHeader } from "reactstrap";

import { deleteEducation } from "../../../actions/ProfileState";
import Spinner from "../../../background/Spinner";

const Education = ({
  deleteEducation,
  auth,
  profile: {
    profile: { education, user }
  }
}) => {
  const onDelete = e => {
    e.preventDefault();
    deleteEducation(_id);
  };

  const {
    _id,
    current,
    school,
    degree,
    field_of_study,
    from,
    to,
    description
  } = education[0];

  return auth.user !== null ? (
    <Card className="card edu">
      <div className="card-main">
        <CardHeader
          tag="h5"
          className="custom-header text-light font-weight-bolder "
          style={{ border: "none" }}
        >
          {console.log(education)}
          {degree}
        </CardHeader>

        {!auth.loading && user._id === auth.user._id && (
          <Button className="card-delete small-btn" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>
        )}
      </div>

      <div className="card-secondary">
        <div className="custom-card">
          <div className="name ">{school}</div>

          <div className="discuss ">{field_of_study}</div>
        </div>
        <div className="more-info">
          <div className="coords">
            <span>Current:</span>
            <span>{current ? "True" : "False"}</span>
          </div>
          <div className="coords">
            <span>From:</span>

            <span>
              <Moment format="YYYY-MM-DD">{from}</Moment>
            </span>
          </div>
          <div className="coords">
            <span>To:</span>
            <span>
              {to === null ? "N/A" : <Moment format="YYYY-MM-DD">{to}</Moment>}
            </span>
          </div>
          {description === "" ? null : (
            <div className="coords">
              <span>Description:</span>
              <span>{description}</span>
            </div>
          )}
          {!auth.loading && user._id === auth.user._id && (
            <Button className="card-delete small-btn" onClick={onDelete}>
              <i className="fas fa-times" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  ) : (
    <Spinner />
  );
};

Education.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  deleteEducation
})(Education);
