import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { sendMail } from "../../actions/MessageState";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const Contact = ({ sendMail }) => {
  const initialState = {
    modal: false,
    mail: {}
  };
  const [state, setState] = useState(initialState);
  const [mail, setMail] = useState({});

  const onChange = e => {
    e.preventDefault();
    setMail({
      ...mail,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setState({ mail: mail });
    sendMail(field);
  };

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className="modal-btn" onClick={toggle}>
      Contact
      <Modal
        className="custom-modal"
        isOpen={state.modal}
        toggle={toggle}
        style={{ color: "#333" }}
      >
        <ModalHeader toggle={toggle}>Send a message to the devs</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="mail">Name*</Label>
              <Input
                type="text"
                name="name"
                id="mail"
                placeholder="Name"
                onChange={onChange}
              ></Input>
              <Label for="mail">Name*</Label>
              <Input
                type="text"
                name="email"
                id="mail"
                placeholder="Email"
                onChange={onChange}
              ></Input>
              <Label for="mail">Name*</Label>
              <Input
                type="textarea"
                name="message"
                id="mail"
                placeholder="message"
                onChange={onChange}
              ></Input>
              <Input
                type="submit"
                value="Send Message"
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

Contact.propTypes = {
  sendMail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  mail: state.mail
});

export default connect(mapStateToProps, { sendMail })(Contact);
