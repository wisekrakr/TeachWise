import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, FormGroup, Input } from "reactstrap";

import { addUserComment } from "../../actions/ItemState";

const CommentForm = ({ itemId, addUserComment }) => {
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
    <div className="comment-form ">
      <h6 className="text-center small-heading">Leave a Comment</h6>
      <p className="heading-underline" />
      <Form className="form" onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="title"
            id="comment"
            placeholder="Add Comment Title..."
            onChange={onChange}
            required
          />
          <Input
            type="textarea"
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            placeholder="Add your Comment..."
            onChange={onChange}
            required
            className="mt-2"
          />

          <Input
            type="submit"
            value="Add Comment"
            className="btn med-btn mt-4"
          />
        </FormGroup>
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addUserComment: PropTypes.func.isRequired
};

export default connect(null, { addUserComment })(CommentForm);
