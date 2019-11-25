import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLogEntry } from "../../actions/LogState";
import { getItems } from "../../actions/ItemState";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const LogEntryModal = ({ addLogEntry, getItems, item: { items, loading } }) => {
  const initialState = {
    modal: false,
    log: {}
  };
  const [state, setState] = useState(initialState);
  const [logEntry, setLogEntry] = useState({});

  useEffect(() => {
    getItems();
  }, [getItems]);

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
                id="logEntry"
                placeholder="Add a log entry title..."
                onChange={onChange}
              ></Input>
              <Label for="item">About a specific topic</Label>
              <Input
                type="select"
                name="topic"
                id="logEntry"
                onChange={onChange}
              >
                <option value=""></option>
                {items.map(item => {
                  return <option key={item._id}>{item.name}</option>;
                })}
              </Input>
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
    </div>
  );
};

LogEntryModal.propTypes = {
  addLogEntry: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addLogEntry, getItems })(
  LogEntryModal
);
