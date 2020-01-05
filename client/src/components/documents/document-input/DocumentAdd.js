import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Form, Input, FormGroup, Button } from "reactstrap";

import { addDocument, getChaptersByItem } from "../../../actions/DocumentState";

const DocumentAdd = ({
  getChaptersByItem,
  addDocument,
  history,
  item: { item, loading },
  document: { chapters }
}) => {
  const [newDoc, setNewDoc] = useState({
    chapter: "",
    title: "",
    info: "",
    description: ""
  });

  useEffect(() => {
    getChaptersByItem(item._id);
  }, [getChaptersByItem, item._id]);

  const { title, info, description } = newDoc;

  const onChange = e => {
    e.preventDefault();
    setNewDoc({ ...newDoc, [e.target.name]: e.target.value });
  };

  const onSelect = e => {
    e.persist();
    // add item to items collection
    const selectedIndex = e.target.options.selectedIndex;

    setNewDoc({
      ...newDoc,
      chapter: e.target.options[selectedIndex].getAttribute("data-id")
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addDocument(newDoc, item._id, history);
    history.goBack();
  };

  return (
    <div className="profile-edu form-container">
      <Container className="half-container">
        <Fragment>
          <h1 className="small-heading">Add a Document</h1>
          <p className="lead">
            <i className="far fa-file-alt" /> Add a document for people who want
            to learn what you've learned
          </p>
          <small>* = required field</small>

          <Form className="form" onSubmit={onSubmit}>
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
            <FormGroup>
              <h6 className="x-small-heading ">Document Title</h6>
              <Input
                type="text"
                placeholder="* Give this document a title"
                name="title"
                value={title}
                onChange={onChange}
                className="custom-input"
                required
              />
            </FormGroup>

            <FormGroup>
              <h6 className="x-small-heading ">Document Summary</h6>
              <Input
                type="textarea"
                name="description"
                cols="30"
                rows="3"
                maxLength="60"
                placeholder="Give a short summary"
                value={description}
                onChange={onChange}
                className="custom-input"
              />
            </FormGroup>
            <FormGroup>
              <h6 className="x-small-heading ">Document Info</h6>
              <Input
                type="textarea"
                name="info"
                cols="30"
                rows="10"
                placeholder="New Document ..."
                value={info}
                onChange={onChange}
                className="custom-input"
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

DocumentAdd.propTypes = {
  addDocument: PropTypes.func.isRequired,
  getChaptersByItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  document: state.document
});

export default connect(mapStateToProps, { addDocument, getChaptersByItem })(
  withRouter(DocumentAdd)
);
