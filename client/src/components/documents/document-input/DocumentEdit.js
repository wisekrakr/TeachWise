import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Form, Input, FormGroup, Button } from "reactstrap";

import {
  addDocument,
  getChaptersByItem,
  getDoc
} from "../../../actions/DocumentState";

const DocumentEdit = ({
  document: { document, chapters, loading },
  addDocument,
  getChaptersByItem,
  history,
  match
}) => {
  const [newDoc, setNewDoc] = useState({
    _id: "",
    chapter: "",
    title: "",
    info: "",
    description: ""
  });

  useEffect(() => {
    getChaptersByItem(match.params.id);
    getDoc(document._id);
    setNewDoc({
      _id: loading || !document._id ? "" : document._id,
      chapter: loading || !document.chapter ? "" : document.chapter,
      title: loading || !document.title ? "" : document.title,
      info: loading || !document.info ? "" : document.info,
      description: loading || !document.description ? "" : document.description
    });
  }, [getChaptersByItem, loading, document, match.params.id]);

  const { title, info, description } = newDoc;

  const onChange = e => {
    e.preventDefault();
    setNewDoc({ ...newDoc, [e.target.name]: e.target.value });
  };

  const onSelect = e => {
    e.persist();

    const selectedIndex = e.target.options.selectedIndex;

    setNewDoc({
      ...newDoc,
      chapter: e.target.options[selectedIndex].getAttribute("data-id")
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    addDocument(newDoc, match.params.id, history, true);

    history.goBack();
  };

  return (
    <div className="profile-edit form-container">
      <Container className="half-container">
        <Fragment>
          <h1 className="large-heading heading">Document Edit</h1>
          <h3 className="small-heading">
            <i className="fas fa-user" /> Add some changes to this document
          </h3>
          <small>* = required field</small>
          <Form onSubmit={e => onSubmit(e)} className="form">
            <FormGroup>
              <h6 className="x-small-heading ">Select a Chapter</h6>
              <Input type="select" name="chapter" onChange={onSelect}>
                <option>{""}</option>
                {!loading
                  ? chapters.map(chapter => {
                      return (
                        <option
                          key={chapter._id}
                          data-id={chapter._id}
                          value={chapter}
                        >
                          {chapter.title}
                        </option>
                      );
                    })
                  : "Loading Field"}
              </Input>
            </FormGroup>
            <FormGroup className="input-group-text">
              <Input
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                className="custom-input"
                required
              />
            </FormGroup>

            <FormGroup className="input-group-text">
              <Input
                type="textarea"
                placeholder="A short description of what this document is about"
                name="description"
                value={description}
                onChange={e => onChange(e)}
                className="custom-input"
                required
              />
            </FormGroup>

            <FormGroup className="input-group-text">
              <Input
                type="textarea"
                placeholder="New Document"
                name="info"
                value={info}
                onChange={e => onChange(e)}
                className="custom-input"
                required
              />
            </FormGroup>

            <Button type="submit" className="btn draw-border">
              Submit{" "}
            </Button>
          </Form>
        </Fragment>
      </Container>
    </div>
  );
};

DocumentEdit.propTypes = {
  getChaptersByItem: PropTypes.func.isRequired,
  getDoc: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  addDocument,
  getChaptersByItem,
  getDoc
})(withRouter(DocumentEdit));
