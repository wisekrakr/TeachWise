import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addChapter } from "../../../actions/DocumentState";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

const ChapterModal = ({ addChapter, item: { item } }) => {
  const initialState = {
    modal: false,
    chapter: {}
  };
  const [state, setState] = useState(initialState);
  const [chapter, setChapter] = useState({});

  const onChange = e => {
    e.preventDefault();
    setChapter({
      ...chapter,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    setState({ chapter: chapter });
    addChapter(chapter, item._id);
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div onClick={toggle}>
      Add Chapter
      <Modal className="custom-modal" isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add A Chapter</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="chapter">Title*</Label>
              <Input
                type="text"
                name="title"
                placeholder="Add a title for this chapter..."
                onChange={onChange}
              ></Input>
              <Label for="chapter">Description*</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Add a short description for this chapter..."
                onChange={onChange}
              ></Input>
              <Button
                type="submit"
                className="btn draw-border"
                style={{ float: "right" }}
              >
                Add Chapter{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

ChapterModal.propTypes = {
  addChapter: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addChapter })(ChapterModal);
