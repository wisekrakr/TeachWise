import React, { useState, useContext } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import itemContext from "../../contexts/items/itemContext";

const CommentForm = ({ itemId }) => {
  const context = useContext(itemContext);
  const { addUserComment } = context;

  const [comment, setComment] = useState("");

  const onChange = e => {
    e.preventDefault();
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = () => {
    addUserComment(itemId, comment);
    setComment("");
  };

  return (
    <div className="comment-form ">
      <h3 className="text-center small-heading">Leave a Comment</h3>
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
          />

          <Input
            type="submit"
            value="Add Comment"
            className="btn btn-dark mt-2"
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommentForm;
