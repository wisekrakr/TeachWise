import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";

import logContext from "../../contexts/logs/logContext";
import { textTruncate } from "../../helpers/TextHelper";

const LogEntry = ({ log }) => {
  const context = useContext(logContext);
  const { deleteLogEntry } = context;

  const { _id, name, entry, date } = log;

  const onDelete = () => {
    deleteLogEntry(_id);
  };

  return (
    <Card className="card bg-dark">
      <Link to={`/api/logs/${_id}`}>
        <CardHeader
          tag="h3"
          className="custom-header text-light font-weight-bolder"
        >
          {textTruncate(name, 30)}
        </CardHeader>{" "}
      </Link>
      <CardBody>
        <ListGroup className="mb-3">
          <ListGroupItem className="list-item">
            {textTruncate(entry, 200)}
          </ListGroupItem>
        </ListGroup>
        <Button className="btn card-delete btn-sm" onClick={onDelete}>
          <i className="fas fa-times" />
        </Button>
        <Moment format="DD/MM/YYYY" className="text-dark float-left">
          {date}
        </Moment>
      </CardBody>
    </Card>
  );
};

export default LogEntry;
