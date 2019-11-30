import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../../actions/ItemState";
import { getFields } from "../../actions/FieldState";
import StudyFieldModal from "../fields/StudyFieldModal";

const ItemModal = ({ addItem, getFields, field: { fields, loading } }) => {
  const initialState = {
    modal: false,
    item: {}
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
    e.preventDefault();
    setState({ item: item });
    addItem(item);
    // toggle();
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className="modal-btn" onClick={toggle}>
      Add Study Item
      <Modal
        className="custom-modal"
        isOpen={state.modal}
        toggle={toggle}
        style={{ color: "#333" }}
      >
        <ModalHeader toggle={toggle}>Add To Study List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Study Item*</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add study item..."
                onChange={onChange}
              ></Input>
              <Label for="item">Study Field*</Label>
              <Input
                type="select"
                name="field_of_study"
                id="item"
                onChange={onChange}
              >
                <option>{""}</option>
                {fields.map(field => {
                  return <option key={field._id}>{field.name}</option>;
                })}
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
              <Input
                type="select"
                name="difficulty"
                id="item"
                onChange={onChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
                <option value="Master">Master</option>
              </Input>
              <Label for="item">Study Material</Label>
              <Input
                type="text"
                name="material"
                id="item"
                placeholder="Add study materials, separated by comma's"
                onChange={onChange}
              ></Input>
              <Label for="item">What is the status of this study?</Label>
              <Input type="select" name="status" id="item" onChange={onChange}>
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

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  getFields: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { addItem, getFields })(ItemModal);
