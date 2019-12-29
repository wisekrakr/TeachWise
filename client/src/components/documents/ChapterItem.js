import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "reactstrap";

import {
  deleteChapter,
  deleteDoc,
  getDocumentByChapter
} from "../../actions/DocumentState";

const ChapterItem = ({
  auth,
  getDocumentByChapter,
  deleteChapter,
  deleteDoc,
  document: { documents, loading },
  chapter: { _id, user, title, description, date }
}) => {
  useEffect(() => {
    getDocumentByChapter(_id);
  }, [getDocumentByChapter]);

  const onDelete = () => {
    deleteChapter(_id);

    documents.filter(doc => {
      console.log(doc);
      deleteDoc(doc._id);
    });
  };

  return (
    !loading &&
    user === auth.user._id && (
      <div className="custom-list list-group">
        <div className="list-item" style={{ background: "transparant" }}>
          <div>
            <Moment format="YYYY-MM-DD HH:mm" className=" float-left m-3">
              {date}
            </Moment>
          </div>

          <Button className="btn list-delete btn-sm" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>

          {documents.map(doc => (
            <div key={doc._id}>{doc.title}</div>
          ))}
        </div>
      </div>
    )
  );
};

ChapterItem.prototypes = {
  document: PropTypes.object.isRequired,
  chapter: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteChapter: PropTypes.func.isRequired,
  getDocumentByChapter: PropTypes.func.isRequired,
  deleteDoc: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  document: state.document
});

export default connect(mapStateToProps, {
  deleteChapter,
  deleteDoc,
  getDocumentByChapter
})(ChapterItem);
