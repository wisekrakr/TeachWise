import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import CommentItem from "./CommentItem";

const CommentList = ({ item }) => {
  const { user_comments } = item;

  if (
    user_comments === null &&
    user_comments === undefined &&
    Object.keys(user_comments).length === 0
  ) {
    return (
      <Fragment>
        <p>No Comments Yet....</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h6 className="text-center small-heading">
        Comments about <strong> {item.name} </strong>
      </h6>
      <p className="heading-underline" />
      <div className="comments">
        {user_comments !== null &&
        user_comments !== undefined &&
        Object.keys(user_comments).length !== 0 ? (
          <ListGroup>
            {/* Shows a list of study items */}

            {user_comments.map(comment => (
              <ListGroupItem className="list-item" key={comment._id}>
                <CommentItem
                  key={comment._id}
                  user_comment={comment}
                  itemId={item._id}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <p>No User Comments </p>
        )}
      </div>
    </Fragment>
  );
};

CommentList.prototypes = {
  item: PropTypes.object.isRequired
};

export default connect(null)(CommentList);
