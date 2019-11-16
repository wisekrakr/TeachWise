import React, { Fragment, useState, useContext } from "react";
import itemContext from "../../contexts/items/itemContext";
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

const ItemModal = () => {
  const initialState = {
    modal: false,
    name: ""
  };
  const [state, setState] = useState(initialState);

  const context = useContext(itemContext);
  const { addItem } = context;

  const [item, setItem] = useState({});

  const onChange = e => {
    e.preventDefault();
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    // e.preventDefault();
    addItem(item);
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

        <Modal isOpen={state.modal} toggle={toggle}>
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
                  type="text"
                  name="field_of_study"
                  id="item"
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

export default ItemModal;
