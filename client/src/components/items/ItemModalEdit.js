import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { addItem, getItem } from "../../actions/ItemState";

const ItemModalEdit = ({
  item: { item, loading },
  addItem,
  getItem,
  history
}) => {
  const initialState = {
    modal: false
  };
  const [state, setState] = useState(initialState);
  const [newItem, setNewItem] = useState({
    name: "",
    difficulty: "",
    material: "",
    status: "",
    field_of_study: ""
  });

  useEffect(() => {
    getItem(item._id);

    setNewItem({
      name: loading || !item.name ? "" : item.name,
      difficulty: loading || !item.difficulty ? "" : item.difficulty,
      field_of_study:
        loading || !item.field_of_study ? "" : item.field_of_study,
      status: loading || !item.status ? "" : item.status,
      material: loading || !item.material ? "" : item.material
    });
  }, [loading, getItem]);

  const { name, difficulty, material, field_of_study, status } = newItem;

  const onChange = e => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    addItem(newItem, history, true);
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className="modal-btn" onClick={toggle} style={{ color: "inherit" }}>
      Edit Study Item
      <Modal
        className="custom-modal"
        isOpen={state.modal}
        toggle={toggle}
        style={{ color: "#333" }}
      >
        <ModalHeader toggle={toggle}>Edit this item</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Study Item*</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add study item..."
                value={name}
                onChange={onChange}
              ></Input>
              <Label for="fieldOfStudy">Study Field*</Label>
              <Input
                type="text"
                name="field_of_study"
                id="fieldOfStudy"
                placeholder="Add study field..."
                onChange={onChange}
                value={field_of_study}
              ></Input>
              <Label for="item">Study Difficulty</Label>
              <Input
                type="select"
                name="difficulty"
                id="item"
                onChange={onChange}
                value={difficulty}
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
                placeholder="Add study material..."
                onChange={onChange}
                value={material}
              ></Input>
              <Label for="item">What is the status of this study?</Label>
              <Input
                type="select"
                name="status"
                id="item"
                onChange={onChange}
                value={status}
              >
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

ItemModalEdit.propTypes = {
  addItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem, getItem })(
  withRouter(ItemModalEdit)
);
