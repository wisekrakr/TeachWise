import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Button,
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
import { addField } from "../../actions/FieldState";

const ItemModal = ({ addItem }) => {
  const initialState = {
    modal: false,
    item: {},
    field_of_study: {}
  };
  const [state, setState] = useState(initialState);
  const [item, setItem] = useState({});
  const [fieldOfStudy, setFieldOfStudy] = useState({});

  const onChange = e => {
    e.preventDefault();
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
    setFieldOfStudy({
      ...fieldOfStudy,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setState({ item: item });
    addItem(item);
    addField(fieldOfStudy);
    toggle();
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <Container>
      <Fragment>
        <Button color="dark" style={{ marginTop: "1rem" }} onClick={toggle}>
          Add Study Item
        </Button>

        <Modal className="custom-modal" isOpen={state.modal} toggle={toggle}>
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
                <Label for="fieldOfStudy">Study Field*</Label>
                <Input
                  type="text"
                  name="field_of_study"
                  id="fieldOfStudy"
                  placeholder="Add study field..."
                  onChange={onChange}
                ></Input>
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
                  placeholder="Add study material..."
                  onChange={onChange}
                ></Input>
                <Label for="item">What is the status of this study?</Label>
                <Input
                  type="select"
                  name="status"
                  id="item"
                  onChange={onChange}
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
      </Fragment>
    </Container>
  );
};

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired
};

export default connect(null, { addItem })(ItemModal);
