import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardSubtitle,
  CardBody,
  CardFooter,
  Spinner
} from "reactstrap";

import itemContext from "../../contexts/items/itemContext";
import { textTruncate } from "../../helpers/TextHelper";

const CommentItem = ({ item, user_comment }) => {
  const context = useContext(itemContext);
  const { deleteUserComment } = context;

  const { _id, title, comment, user, date } = user_comment;

  function onDelete(e) {
    console.log("bliep");
    e.preventDefault();
    deleteUserComment(item._id, _id);
  }

  return (
    <div className="comment" style={{ height: "100%" }}>
      <div className="comment-header">
        {textTruncate(user, 15)}
        <div className="custom-img" />
      </div>
      <div className="comment-body">
        <div className="comment-title">{textTruncate(title, 25)}</div>
        <div>
          {comment.split("\n").map((text, i) => {
            return (
              <p key={i} data={text}>
                {text}
              </p>
            );
          })}
        </div>
      </div>
      <div>
        <div className="comment-footer">
          <Moment
            format="YYYY-MM-DD HH:mm"
            className="text-dark float-left text-center"
          >
            {date}
          </Moment>
        </div>
      </div>
      <Button
        className="btn card-delete btn-sm"
        key={_id}
        onClick={deleteUserComment(item._id, _id)}
      >
        <i className="fas fa-times" />
      </Button>
    </div>
  );
};

export default CommentItem;
