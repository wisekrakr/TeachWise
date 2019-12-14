import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button } from "reactstrap";

import { deleteUserComment } from "../../actions/ItemState";
import { textTruncate } from "../../helpers/text";
import Spinner from "../../background/Spinner";

const CommentItem = ({
  itemId,
  user_comment: { _id, title, comment, user, avatar, name, date },
  auth,
  deleteUserComment
}) => {
  return _id !== null && auth.user !== null ? (
    <div className="comment" style={{ height: "100%" }}>
      <div className="comment-header">
        <Link to={`/profile/${user}`} style={{ color: "#333" }}>
          {textTruncate(name, 15)}
        </Link>
        <div
          className="comment-img"
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
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
          <Moment format="YYYY-MM-DD HH:mm" className="float-left text-center">
            {date}
          </Moment>
        </div>
      </div>
      {!auth.loading && user === auth.user._id && (
        <Button
          className="card-delete small-btn "
          key={_id}
          onClick={async e => {
            e.preventDefault();
            await deleteUserComment(itemId, _id);
          }}
        >
          <i className="fas fa-times" />
        </Button>
      )}
    </div>
  ) : (
    <Spinner />
  );
};

CommentItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  user_comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  deleteUserComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteUserComment })(CommentItem);
