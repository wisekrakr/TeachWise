import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Form,
  Input,
  FormGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faGraduationCap,
  faSchool
} from "@fortawesome/free-solid-svg-icons";

import { addEducation } from "../../../actions/ProfileState";

const ProfileAddEducation = ({ addEducation, history }) => {
  const [newEdu, setNewEdu] = useState({
    school: "",
    degree: "",
    field_of_study: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    field_of_study,
    from,
    to,
    current,
    description
  } = newEdu;

  const onChange = e => {
    e.preventDefault();
    setNewEdu({ ...newEdu, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addEducation(newEdu, history);
    history.goBack();
  };

  return (
    <div className="profile-edu form-container">
      <Container className="half-container">
        <Fragment>
          <h1 className="small-heading">Add Your Education</h1>
          <p className="lead">
            <i className="fas fa-code-branch" /> Add any school or bootcamp that
            you have attended
          </p>
          <small>* = required field</small>

          <Form className="form" onSubmit={onSubmit}>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faSchool} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="* School or Bootcamp"
                name="school"
                value={school}
                onChange={onChange}
                className="custom-input"
                required
              />
            </FormGroup>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faGraduationCap} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={degree}
                onChange={onChange}
                className="custom-input"
                required
              />
            </FormGroup>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faUniversity} className="form-icon" />
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="* Field of Study"
                name="field_of_study"
                value={field_of_study.name}
                onChange={onChange}
                className="custom-input"
              />
            </FormGroup>
            <FormGroup>
              <h6 className="x-small-heading ">* From Date</h6>
              <Input
                type="date"
                name="from"
                value={from}
                onChange={onChange}
                className="custom-input"
              />
            </FormGroup>
            <FormGroup>
              <h6 className="x-small-heading ">Current Education?</h6>
              <Input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={() => {
                  setNewEdu({ ...newEdu, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
                className="ml-5"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <h6 className="x-small-heading ">To Date</h6>
              <Input
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                disabled={toDateDisabled ? "disabled" : ""}
              />
            </FormGroup>
            <FormGroup>
              <h6 className="x-small-heading ">Education Description</h6>
              <Input
                type="textarea"
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value={description}
                onChange={onChange}
                className="custom-input"
              />
            </FormGroup>
            <Button type="submit" className="btn draw-border">
              Submit{" "}
            </Button>
          </Form>
        </Fragment>
      </Container>
    </div>
  );
};

ProfileAddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(ProfileAddEducation));
