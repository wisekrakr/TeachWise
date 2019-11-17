import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import itemContext from "../../contexts/items/itemContext";
import { textTruncate } from "../../helpers/TextHelper";

const StudyItem = ({ item }) => {
  const context = useContext(itemContext);
  const { deleteItem } = context;

  const {
    _id,
    name,
    field_of_study,
    material,
    difficulty,
    date,
    status,
    user
  } = item;

  const onDelete = e => {
    e.preventDefault();
    deleteItem(_id);
  };

  return (
    <Card className="card blue">
      <div className="card-main">
        <CardHeader
          tag="h3"
          className="custom-header text-light font-weight-bolder "
        >
          {name}
        </CardHeader>

        <Button className="btn card-delete btn-sm" onClick={onDelete}>
          <i className="fas fa-times" />
        </Button>
      </div>

      <div className="card-secondary">
        <div className="custom-card">
          <div className="name ">{textTruncate(field_of_study, 15)}</div>
          <img
            className="custom-img "
            // src={user.avatar}
            alt=""
          />

          <div className="discuss ">
            <Link to={`/api/items/${_id}`} style={{ color: "#fff" }}>
              Discuss
            </Link>
          </div>
        </div>
        <div className="more-info">
          <CardHeader className="card-title">{user}</CardHeader>

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
          {/* <div className="stats">
            <div>
              <div className="title">Studies</div>
              <i className="fas fa-book"></i>
              <div className="value">32</div>
            </div>
            <div>
              <div className="title">Completed</div>
              <i className="fas fa-graduation-cap"></i>
              <div className="value">27</div>
            </div>
            <div>
              <div className="title">People</div>
              <i className="fas fa-users"></i>
              <div className="value">123</div>
            </div>
          </div> */}
          <Button className="btn card-delete btn-sm" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StudyItem;
