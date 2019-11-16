import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import itemContext from "../../contexts/items/itemContext";
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
      <h3 className="text-center small-heading">
        Comments about <strong> {item.name} </strong>
      </h3>
      <p className="heading-underline" />
      <div className="comments">
        {user_comments !== null &&
        user_comments !== undefined &&
        Object.keys(user_comments).length !== 0 ? (
          <ListGroup>
            {/* Shows a list of study items */}
            <TransitionGroup className="custom-list">
              {user_comments.map(comment => (
                <CSSTransition
                  key={comment._id}
                  timeout={500}
                  classNames="fade"
                >
                  <ListGroupItem className="list-item" key={comment._id}>
                    <CommentItem
                      key={comment._id}
                      user_comment={comment}
                      item={item}
                    />
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <p>No User Comments </p>
        )}
      </div>
    </Fragment>
  );
};

export default CommentList;
