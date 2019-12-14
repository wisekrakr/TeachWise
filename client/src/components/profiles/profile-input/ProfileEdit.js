import React, { Fragment, useState, useEffect } from "react";
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
  faGlobe,
  faSearchLocation,
  faShapes,
  faPortrait,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import {
  createProfile,
  getCurrentProfile
} from "../../../actions/ProfileState";

const ProfileEdit = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [newProfile, setNewProfile] = useState({
    avatar: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setNewProfile({
      avatar: loading || !profile.avatar ? "" : profile.avatar,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    avatar,
    website,
    location,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = newProfile;

  const onChange = e => {
    e.preventDefault();
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(newProfile, history, true);

    history.goBack();
  };

  return (
    <div className="profile-edit form-container">
      <Container className="half-container">
        <Fragment>
          <h1 className="large-heading heading">Profile Edit</h1>
          <h3 className="small-heading">
            <i className="fas fa-user" /> Add some changes to your profile
          </h3>
          <small>* = required field</small>
          <Form onSubmit={e => onSubmit(e)} className="form">
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faGlobe} className="form-icon" />
              </InputGroupAddon>

              <Input
                type="text"
                placeholder="Website"
                name="website"
                value={website}
                onChange={e => onChange(e)}
                className="custom-input"
                required
              />
            </FormGroup>
            <small className="form-text">
              Could be your own or a company website
            </small>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon
                  icon={faSearchLocation}
                  className="form-icon"
                />
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => onChange(e)}
                className="custom-input"
                required
              />
            </FormGroup>
            <small className="form-text">
              City & Country suggested (eg. Madrid, Spain)
            </small>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faShapes} className="form-icon" />
              </InputGroupAddon>

              <Input
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={e => onChange(e)}
                className="custom-input"
                required
              />
            </FormGroup>
            <small className="form-text">
              * Please use comma separated values (eg. Philosophy, Rock
              Climbing, Neuroscience, Origami)
            </small>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faPortrait} className="form-icon" />
              </InputGroupAddon>

              <Input
                type="text"
                placeholder="Avatar"
                name="avatar"
                value={avatar}
                onChange={e => onChange(e)}
                className="custom-input"
              />
            </FormGroup>
            <small className="form-text">Place any url to any picture</small>
            <FormGroup className="input-group-text">
              <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faUser} className="form-icon" />
              </InputGroupAddon>

              <Input
                type="textarea"
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={e => onChange(e)}
                className="custom-input"
              />
            </FormGroup>
            <div className="my-2">
              <Button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                className="btn draw-border"
              >
                Add Social Network Links
              </Button>
              <span>Optional</span>
            </div>

            {displaySocialInputs && (
              <Fragment>
                <FormGroup className="input-group-text social-input">
                  <InputGroupAddon addonType="prepend">
                    <i className="fab fa-twitter fa-2x" />
                  </InputGroupAddon>

                  <Input
                    type="text"
                    placeholder="Twitter Url"
                    name="twitter"
                    value={twitter}
                    onChange={e => onChange(e)}
                    className="custom-input"
                  />
                </FormGroup>
                <FormGroup className="input-group-text social-input">
                  <InputGroupAddon addonType="prepend">
                    <i className="fab fa-facebook fa-2x" />
                  </InputGroupAddon>

                  <Input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={e => onChange(e)}
                    className="custom-input"
                  />
                </FormGroup>
                <FormGroup className="input-group-text social-input">
                  <InputGroupAddon addonType="prepend">
                    <i className="fab fa-youtube fa-2x" />
                  </InputGroupAddon>

                  <Input
                    type="text"
                    placeholder="Youtube URL"
                    name="youtube"
                    value={youtube}
                    onChange={e => onChange(e)}
                    className="custom-input"
                  />
                </FormGroup>
                <FormGroup className="input-group-text social-input">
                  <InputGroupAddon addonType="prepend">
                    <i className="fab fa-linkedin fa-2x" />
                  </InputGroupAddon>

                  <Input
                    type="text"
                    placeholder="LinkedIn URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={e => onChange(e)}
                    className="custom-input"
                  />
                </FormGroup>
                <FormGroup className="input-group-text social-input">
                  <InputGroupAddon addonType="prepend">
                    <i className="fab fa-instagram fa-2x" />
                  </InputGroupAddon>

                  <Input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={e => onChange(e)}
                    className="custom-input"
                  />
                </FormGroup>
              </Fragment>
            )}

            <Button type="submit" className="btn draw-border">
              Submit{" "}
            </Button>
          </Form>
        </Fragment>
      </Container>
    </div>
  );
};

ProfileEdit.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(ProfileEdit)
);
