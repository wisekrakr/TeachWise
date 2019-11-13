import React, { Fragment, useState, useContext } from "react";
import logContext from "../../contexts/logs/logContext";
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

const LogEntryModal = () => {
  const initialState = {
    modal: false,
    name: ""
  };
  const [state, setState] = useState(initialState);

  const context = useContext(logContext);
  const { addLogEntry } = context;

  const [logEntry, setLogEntry] = useState({});

  const onChange = e => {
    setLogEntry({
      ...logEntry,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = () => {
    addLogEntry(logEntry);
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
          Add Entry into Logs
        </Button>

        <Modal isOpen={state.modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Entry into Logs</ModalHeader>
          <ModalBody>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="logEntry">Log Entry Title*</Label>
                <Input
                  type="text"
                  name="name"
                  id="logEntry"
                  placeholder="Add a log entry title..."
                  onChange={onChange}
                ></Input>
                <Label for="logEntry">What are your thoughts?*</Label>
                <Input
                  type="textarea"
                  name="entry"
                  id="logEntry"
                  placeholder="Add your log entry here..."
                  onChange={onChange}
                ></Input>
                <br />
                *required
                <br />
                <Input
                  type="submit"
                  value="Enter Log into System"
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

export default LogEntryModal;
