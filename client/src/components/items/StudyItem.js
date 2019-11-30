import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button, Card, CardHeader } from "reactstrap";

import { deleteItem, addLike, removeLike } from "../../actions/ItemState";
import { textTruncate } from "../../helpers/TextHelper";

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
    material,
    likes,
    difficulty,
    status,
    user_comments,
    date
  },
  showAll
}) => {
  const onDelete = e => {
    e.preventDefault();
    deleteItem(_id);
  };

  const userItems = !auth.loading && user === auth.user._id && (
    <Card className="card blue">
      <div className="card-main">
        <CardHeader
          tag="h3"
          className="custom-header text-light font-weight-bolder "
          style={{ border: "none" }}
        >
          {name}
        </CardHeader>

        <Button className="btn card-delete btn-sm" onClick={onDelete}>
          <i className="fas fa-times" />
        </Button>
      </div>

      <div className="card-secondary">
        <div className="custom-card">
          <div className="name ">{username}</div>
          {/* <img
        className="custom-img "
        // src={user.avatar}
        alt=""
      /> */}

          <div className="discuss ">
            <Link to={`/api/items/${_id}`} style={{ color: "#fff" }}>
              {user_comments.length} comments
            </Link>
          </div>

          <div className="likes">
            <Button
              onClick={() => addLike(_id)}
              className="btn btn-sm btn-like"
              color="transparant"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </Button>
            <Button
              onClick={() => removeLike(_id)}
              color="transparant"
              className="btn btn-sm btn-unlike"
            >
              <i className="fas fa-thumbs-down" />
            </Button>
          </div>
        </div>
        <div className="more-info">
          <div className="coords">
            <span>Field of study:</span>
            <span>{textTruncate(field_of_study, 15)}</span>
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
          <div className="stats">
            <div>
              <div className="title">Studies</div>
              <i className="fas fa-book"></i>
              <div className="value">32</div>
            </div>

            <div>
              <div className="title">Classmates</div>
              <i className="fas fa-users"></i>
              <div className="value">123</div>
            </div>
          </div>

          <Button className="btn card-delete btn-sm" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const allItems = (
    <Card className="card blue">
      <div className="card-main">
        <CardHeader
          tag="h3"
          className="custom-header text-light font-weight-bolder "
          style={{ border: "none" }}
        >
          {name}
        </CardHeader>

        {!auth.loading && user === auth.user._id && (
          <Button className="btn card-delete btn-sm" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>
        )}
      </div>

      <div className="card-secondary">
        <div className="custom-card">
          <div className="name ">{username}</div>
          {/* <img
        className="custom-img "
        // src={user.avatar}
        alt=""
      /> */}

          <div className="discuss ">
            <Link to={`/api/items/${_id}`} style={{ color: "#fff" }}>
              {user_comments.length} comments
            </Link>
          </div>

          <div className="likes">
            <Button
              onClick={() => addLike(_id)}
              className="btn btn-sm btn-like"
              color="transparant"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </Button>
            <Button
              onClick={() => removeLike(_id)}
              color="transparant"
              className="btn btn-sm btn-unlike"
            >
              <i className="fas fa-thumbs-down" />
            </Button>
          </div>
        </div>
        <div className="more-info">
          <div className="coords">
            <span>Field of study:</span>
            <span>{textTruncate(field_of_study, 15)}</span>
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
          <div className="stats">
            <div>
              <div className="title">Studies</div>
              <i className="fas fa-book"></i>
              <div className="value">32</div>
            </div>

            <div>
              <div className="title">Classmates</div>
              <i className="fas fa-users"></i>
              <div className="value">123</div>
            </div>
          </div>
          {!auth.loading && user === auth.user._id && (
            <Button className="btn card-delete btn-sm" onClick={onDelete}>
              <i className="fas fa-times" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return !showAll ? userItems : allItems;
};

StudyItem.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showAll: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteItem, addLike, removeLike })(
  StudyItem
);
