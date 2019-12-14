import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Button } from "reactstrap";

import { deleteField, deleteUserField } from "../../actions/FieldState";
import { textTruncate } from "../../helpers/text";
import Spinner from "../../background/Spinner";

const StudyFieldItem = ({
  auth,
  deleteField,
  field: { _id, user, name, number, date }
}) => {
  const onDelete = () => {
    deleteField(_id);
    deleteUserField(user, _id);
  };

  const AltListItemStyle = styled.li`
    &::before,
    &::after {
      content: "";
    }
    &::before {
      content: "${number}";
    }
  `;

  return auth.user !== null ? (
    <AltListItemStyle className="alt-list-item">
      {!auth.loading && user === auth.user._id && (
        <Button className="btn list-delete btn-sm" onClick={onDelete}>
          <i className="fas fa-times" />
        </Button>
      )}

      <Link to={`/api/fields/${_id}`}>
        <div className="font-weight-bolder">{textTruncate(name, 40)}</div>{" "}
      </Link>
    </AltListItemStyle>
  ) : (
    <Spinner />
  );
};

StudyFieldItem.propTypes = {
  field: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteField: PropTypes.func.isRequired,
  deleteUserField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteField, deleteUserField })(
  StudyFieldItem
);
