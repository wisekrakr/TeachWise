import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "reactstrap";

import { deleteField } from "../../actions/FieldState";
import { textTruncate } from "../../helpers/TextHelper";

const StudyFieldItem = ({
  auth,
  deleteField,
  field: { _id, user, name, date },
  showAll
}) => {
  const onDelete = () => {
    deleteField(_id);
  };

  const userFields = !auth.loading && user === auth.user._id && (
    <li className="alt-list-item">
      <Button className="btn list-delete btn-sm" onClick={onDelete}>
        <i className="fas fa-times" />
      </Button>

      <Link to={`/api/fields/${_id}`}>
        <div className="font-weight-bolder">{textTruncate(name, 40)}</div>{" "}
      </Link>
    </li>
  );

  const allFields = (
    <li className="alt-list-item">
      {!auth.loading && user === auth.user._id && (
        <Button className="btn list-delete btn-sm" onClick={onDelete}>
          <i className="fas fa-times" />
        </Button>
      )}

      <Link to={`/api/fields/${_id}`}>
        <div className="font-weight-bolder">{textTruncate(name, 40)}</div>{" "}
      </Link>
    </li>
  );

  return <Fragment>{!showAll ? userFields : allFields}</Fragment>;
};

StudyFieldItem.propTypes = {
  field: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteField: PropTypes.func.isRequired,
  showAll: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteField })(StudyFieldItem);
