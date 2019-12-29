import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button, Card, CardHeader } from "reactstrap";

import { deleteItem, addLike, removeLike } from "../../actions/ItemState";
import { textTruncate } from "../../helpers/text";
import Spinner from "../../background/Spinner";

const StudyItem = ({
  deleteItem,
  addLike,
  removeLike,
  auth,
  item: {
    _id,
    user,
    username,
    name,
    field_of_study,
    likes,
    difficulty,
    status,
    user_comments,
    date
  }
}) => {
  const onDelete = e => {
    e.preventDefault();
    deleteItem(_id);
  };

  return auth.user !== null && field_of_study.name !== undefined ? (
    <Card className="card blue">
      <div className="card-main">
        <CardHeader
          tag="h5"
          className="custom-header text-light font-weight-bolder "
          style={{ border: "none" }}
        >
          {name}
        </CardHeader>

        {!auth.loading && user === auth.user._id && (
          <Button className="card-delete small-btn" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>
        )}
      </div>

      <div className="card-secondary">
        <div className="custom-card">
          <div className="name ">{username}</div>

          <div className="discuss ">
            <Link
              to={`/api/items/${_id}`}
              style={{ color: "rgb(202, 200, 200)" }}
            >
              {user_comments.length} comments
            </Link>
          </div>

          <div className="likes">
            <Button
              onClick={() => addLike(_id)}
              className=" btn-like"
              color="transparant"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </Button>
            <Button
              onClick={() => removeLike(_id)}
              color="transparant"
              className=" btn-unlike"
            >
              <i className="fas fa-thumbs-down" />
            </Button>
          </div>
        </div>
        <div className="more-info">
          <div className="coords">
            <span>Field of study:</span>
            <span>{textTruncate(field_of_study.name, 15)}</span>
          </div>
          <div className="coords">
            <span>Difficulty:</span>
            <span>{difficulty}</span>
          </div>
          <div className="coords">
            <span>Date Added:</span>
            <span>
              {" "}
              <Moment format="YYYY-MM-DD">{date}</Moment>
            </span>
          </div>
          <div className="coords">
            <span>Status:</span>
            <span>{status}</span>
          </div>

          {!auth.loading && user === auth.user._id && (
            <Button className="card-delete small-btn" onClick={onDelete}>
              <i className="fas fa-times" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  ) : (
    <Spinner />
  );
};

StudyItem.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteItem,
  addLike,
  removeLike
})(StudyItem);
