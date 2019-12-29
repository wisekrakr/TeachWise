import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
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
import { connect } from "react-redux";

import { addItem } from "../../../actions/ItemState";
import { getFields } from "../../../actions/FieldState";
import StudyFieldModal from "../../fields/StudyFieldModal";

const ItemModal = ({
  addItem,
  getFields,
  field: { fields, loading },
  history
}) => {
  const initialState = {
    modal: false,
    isClearable: true,
    isSearchable: true
  };
  const [state, setState] = useState(initialState);
  const [item, setItem] = useState({});

  useEffect(() => {
    getFields();
  }, [getFields]);

  const onChange = e => {
    e.preventDefault();
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    // e.preventDefault();
    // add item to items collection
    addItem(item, history, false);

    // close the modal
    toggle();
  };

  const onSelect = e => {
    e.persist();
    // add item to items collection
    const selectedIndex = e.target.options.selectedIndex;

    setItem({
      ...item,
      field_of_study: e.target.options[selectedIndex].getAttribute("data-id")
    });
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className="modal-btn" onClick={toggle}>
      Add Study Item
      <Modal className="custom-modal" isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="custom-modal-header">
          Add To Study List
        </ModalHeader>
        <ModalBody className="custom-modal-body">
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Study Item*</Label>
              <Input
                type="text"
                name="name"
                placeholder="Add study item..."
                onChange={onChange}
              ></Input>
              <Label for="item">Study Field*</Label>
              <Input type="select" name="field_of_study" onChange={onSelect}>
                <option>{""}</option>
                {!loading
                  ? fields.map(field => {
                      return (
                        <option
                          key={field._id}
                          data-id={field._id}
                          value={field}
                        >
                          {field.name}
                        </option>
                      );
                    })
                  : "Loading Field"}
              </Input>
              <span
                style={{
                  float: "right",
                  padding: "0.5rem",
                  fontSize: "15px"
                }}
              >
                <StudyFieldModal />
              </span>
              <br />
              <Label for="item">Study Difficulty</Label>
              <Input type="select" name="difficulty" onChange={onChange}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
                <option value="Master">Master</option>
              </Input>
              <Label for="item">Study Material</Label>
              <Input
                type="text"
                name="material"
                placeholder="Add study materials, separated by comma's"
                onChange={onChange}
              ></Input>
              <Label for="item">What is the status of this study?</Label>
              <Input type="select" name="status" onChange={onChange}>
                <option value="Not Started">Not Started</option>
                <option value="Started">Started</option>
                <option value="Going Strong">Going Strong</option>
                <option value="Last Stages">Last Stages</option>
                <option value="Completed">Completed</option>
                <option value="Mastered">Mastered</option>
              </Input>
              <br />
              *required
              <br />
              <Button
                type="submit"
                className="btn draw-border"
                style={{ float: "right" }}
              >
                Add Item{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  getFields: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { addItem, getFields })(ItemModal);
