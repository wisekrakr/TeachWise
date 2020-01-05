import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Spinner } from "reactstrap";

import { deleteDoc } from "../../actions/DocumentState";
import { textTruncate } from "../../helpers/text";

const DocumentItem = ({ auth, deleteDoc, doc }) => {
  const onDelete = () => {
    deleteDoc(doc._id);
  };

  return doc !== null ? (
    <div className="document">
      <div>
        <Link to={`/api/documents/${doc._id}`}>
          <p>{textTruncate(doc.title, 70)}</p>
        </Link>
      </div>
      <span>{textTruncate(doc.description, 70)} </span>
      {auth.user._id === doc.user ? (
        <Button className="btn  btn-sm" onClick={onDelete}>
          <i className="fas fa-times" />
        </Button>
      ) : null}
      <hr />
    </div>
  ) : (
    <Spinner />
  );
};

DocumentItem.prototypes = {
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  deleteDoc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  document: state.doc
});

export default connect(mapStateToProps, {
  deleteDoc
})(DocumentItem);
