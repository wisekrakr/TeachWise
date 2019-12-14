import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addField, addUserField } from "../../actions/FieldState";

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

const StudyFieldModal = ({ user, addField, addUserField }) => {
  const initialState = {
    modal: false,
    field: {}
  };
  const [state, setState] = useState(initialState);
  const [field, setField] = useState({});

  const onChange = e => {
    e.preventDefault();
    setField({
      ...field,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setState({ field: field });
    addField(field);
    addUserField(user._id, field);
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className="modal-btn" onClick={toggle}>
      Add Field of Study
      <Modal
        className="custom-modal"
        isOpen={state.modal}
        toggle={toggle}
        style={{ color: "#333" }}
      >
        <ModalHeader toggle={toggle}>Add A Study Field</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="field">Name*</Label>
              <Input
                type="text"
                name="name"
                id="field"
                placeholder="Add the name of your new field of study..."
                onChange={onChange}
              ></Input>
              <Button
                type="submit"
                className="btn draw-border"
                style={{ float: "right" }}
              >
                Add Study Field{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

StudyFieldModal.propTypes = {
  addField: PropTypes.func.isRequired,
  addUserField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addField, addUserField })(
  StudyFieldModal
);
