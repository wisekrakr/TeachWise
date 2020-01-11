import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLogEntry } from "../../actions/LogState";
import { getItemsFromUser } from "../../actions/ItemState";

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

const LogEntryModal = ({
  auth: { user },
  addLogEntry,
  getItemsFromUser,
  item: { items, loading }
}) => {
  const initialState = {
    modal: false,
    log: {}
  };
  const [state, setState] = useState(initialState);
  const [logEntry, setLogEntry] = useState({});

  // useEffect(() => {
  //   getItemsFromUser(user._id);
  // }, [getItemsFromUser, user._id]);

  const onChange = e => {
    e.preventDefault();
    setLogEntry({
      ...logEntry,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setState({ log: logEntry });
    addLogEntry(logEntry);
    toggle();
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className="modal-btn" onClick={toggle}>
      Add Entry to Log
      <Modal
        className="custom-modal"
        isOpen={state.modal}
        toggle={toggle}
        style={{ color: "#333" }}
      >
        <ModalHeader toggle={toggle}>Add Entry into Logs</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="logEntry">Log Entry Title*</Label>
              <Input
                type="text"
                name="name"
                placeholder="Add a log entry title..."
                onChange={onChange}
              ></Input>
              <Label for="logEntry">About a specific topic</Label>
              <Input
                type="select"
                name="topic"
                onChange={onChange}
                placeholder="Choose a study item"
              >
                <option></option>
                {!loading &&
                  items.map(item => {
                    return <option key={item._id}>{item.name}</option>;
                  })}
              </Input>
              <Label for="logEntry">What are your thoughts?*</Label>
              <Input
                type="textarea"
                name="entry"
                placeholder="Add your log entry here..."
                onChange={onChange}
              ></Input>
              <br />
              *required
              <br />
              <Button
                type="submit"
                className="btn draw-border"
                style={{ float: "right" }}
              >
                Enter log into system{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

LogEntryModal.propTypes = {
  addLogEntry: PropTypes.func.isRequired,
  getItemsFromUser: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { addLogEntry, getItemsFromUser })(
  LogEntryModal
);
