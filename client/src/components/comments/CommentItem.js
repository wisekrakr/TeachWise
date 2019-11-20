import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button } from "reactstrap";

import { deleteUserComment } from "../../actions/ItemState";
import { textTruncate } from "../../helpers/TextHelper";

const CommentItem = ({
  itemId,
  user_comment: { _id, title, comment, user, date },
  auth,
  deleteUserComment
}) => {
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
        onClick={async e => {
          e.preventDefault();
          await deleteUserComment(itemId, _id);
        }}
      >
        <i className="fas fa-times" />
      </Button>
    </div>
  );
};

CommentItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  user_comment: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  deleteUserComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteUserComment })(CommentItem);
