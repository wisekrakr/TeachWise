import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addField } from "../../actions/FieldState";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const StudyFieldModal = ({ addField }) => {
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
              <Input
                type="submit"
                value="Add Item"
                className="btn btn-dark"
                style={{ marginTop: "2rem" }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

StudyFieldModal.propTypes = {
  addField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addField })(StudyFieldModal);
