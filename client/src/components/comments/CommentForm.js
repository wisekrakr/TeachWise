import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from "reactstrap";

import { addUserComment } from "../../actions/ItemState";
import { getCurrentProfile } from "../../actions/ProfileState";

const CommentForm = ({
  getCurrentProfile,
  itemId,
  addUserComment,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [comment, setComment] = useState("");

  const onChange = e => {
    e.preventDefault();
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addUserComment(itemId, comment);
    setComment("");
  };

  return (
    !loading && (
      <div className="comment-form ">
        <h6 className="text-center small-heading">Leave a Comment</h6>
        <p className="heading-underline" />
        <Form className="form" onSubmit={onSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="title"
              placeholder="Add Comment Title..."
              onChange={onChange}
              required
            />
            <Input
              type="textarea"
              name="comment"
              cols="30"
              rows="5"
              placeholder="Add your Comment..."
              onChange={onChange}
              required
              className="mt-2"
            />
            {profile !== null && profile !== undefined ? (
              <Input
                type="submit"
                value="Add Comment"
                className="btn med-btn mt-4"
              />
            ) : (
              <Button className="btn draw-border">
                <Link to="/profile-creation" className="custom-link">
                  Please Create a Profile before commenting
                </Link>
              </Button>
            )}
          </FormGroup>
        </Form>
      </div>
    )
  );
};

CommentForm.propTypes = {
  profile: PropTypes.object.isRequired,
  addUserComment: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addUserComment, getCurrentProfile })(
  CommentForm
);
