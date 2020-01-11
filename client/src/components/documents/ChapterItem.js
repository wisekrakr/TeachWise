import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Moment from "react-moment";
import { Button, Collapse } from "reactstrap";

import {
  deleteChapter,
  deleteDoc,
  getDocumentsByChapter
} from "../../actions/DocumentState";
import { textTruncate } from "../../helpers/text";

import DocumentItem from "./DocumentItem";
import Spinner from "../../background/Spinner";

const ChapterItem = ({
  auth,
  deleteChapter,
  deleteDoc,
  chapter: { _id, user, title, description, documents, date }
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = e => {
    e.persist();

    setIsOpen(!isOpen);
  };

  const onDelete = e => {
    e.preventDefault();
    deleteChapter(_id);

    documents.filter(doc => {
      return deleteDoc(doc._id);
    });
  };

  return auth.user !== null && _id !== undefined ? (
    <div className="chapter">
      <nav className="chapter-nav">
        <Moment format="YYYY-MM-DD HH:mm" className=" float-left m-3">
          {date}
        </Moment>
        {auth.user._id === user ? (
          <Button className="btn list-delete btn-sm" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>
        ) : null}

        <div className="chapter-nav-item">
          <Button value={_id} onClick={e => onClick(e)} className="nav-btn">
            {title}
          </Button>
          <span className="desc">{textTruncate(description, 75)}</span>
        </div>

        <Collapse isOpen={isOpen} className="chapter-collapse">
          <ul className="chapter-list list-group">
            {documents.map(doc => (
              <ul key={doc._id}>
                <li key={doc._id} className="chapter-list-item list-item">
                  <DocumentItem key={doc._id} doc={doc} />
                </li>
              </ul>
            ))}
          </ul>
        </Collapse>
      </nav>
    </div>
  ) : (
    <Spinner />
  );
};

ChapterItem.prototypes = {
  chapter: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteChapter: PropTypes.func.isRequired,
  deleteDoc: PropTypes.func.isRequired,
  getDocumentsByChapter: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  document: state.document
});

export default connect(mapStateToProps, {
  deleteChapter,
  deleteDoc,
  getDocumentsByChapter
})(ChapterItem);
