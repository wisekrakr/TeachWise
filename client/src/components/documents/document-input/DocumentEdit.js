import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Form, Input, FormGroup, Button } from "reactstrap";

import { addDocument } from "../../../actions/DocumentState";

const DocumentEdit = ({
  document: { document, loading },
  addDocument,
  history,
  match
}) => {
  const [newDoc, setNewDoc] = useState({
    title: "",
    info: "",
    description: ""
  });

  useEffect(() => {
    setNewDoc({
      title: loading || !document.title ? "" : document.title,
      info: loading || !document.info ? "" : document.info,
      description: loading || !document.description ? "" : document.description
    });
  }, [loading]);

  const { title, info, description } = newDoc;

  const onChange = e => {
    e.preventDefault();
    setNewDoc({ ...newDoc, [e.target.name]: e.target.value });
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
  addDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, { addDocument })(
  withRouter(DocumentEdit)
);
