import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Badge,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Spinner,
  Col,
  Row
} from "reactstrap";

import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";
import { textTruncate } from "../helpers/TextHelper";

const StudyPage = props => {
  const [item, setItem] = useState({});

  useEffect(() => {
    axios
      .get(`/api/items/${props.match.params.id}`)
      .then(res => {
        setItem(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.match.params.id]);

  const { name, field_of_study, difficulty, date, material, status } = item;

  const statusColor = () => {
    let color = "";
    switch (item.status) {
      case "Not Started":
        color = "danger";
        break;
      case "Started":
        color = "secondary";
        break;
      case "Going Strong":
        color = "info";
        break;
      case "Last Stages":
        color = "primary";
        break;
      case "Completed":
        color = "success";
        break;
      case "Mastered":
        color = "warning";
        break;
      default:
        color = "primary";
    }
    return color;
  };

  return item !== null &&
    item !== undefined &&
    Object.keys(item).length !== 0 ? (
    <Fragment>
      <Jumbotron fluid>
        <Container fluid>
          <Badge
            className="status-badge"
            color={statusColor()}
            style={{ float: "right" }}
          >
            {status}
          </Badge>
          <h1 className="display-3">{textTruncate(name, 40)}</h1>

          <p className="lead">
            This topic was added on <Moment format="DD/MM/YYYY">{date}</Moment>
          </p>
          <hr className="my-2" />
          <p>
            Field of Study: <strong>{textTruncate(field_of_study, 40)}</strong>{" "}
          </p>
          <p>
            Study Material: <strong>{material}</strong>{" "}
          </p>
          <p>
            Learning Curve: <strong>{difficulty}</strong>{" "}
          </p>

          <ListGroup className="flex-row m-auto">
            <Link
              to={`/api/items/${name}`}
              className="btn btn-dark mt-4"
              color="dark"
            >
              More {textTruncate(name, 15)}
            </Link>

            <Link
              to={`/api/items/${field_of_study}`}
              className="btn btn-dark mt-4 ml-4"
              color="dark"
            >
              More {textTruncate(field_of_study, 15)}
            </Link>
          </ListGroup>
        </Container>
      </Jumbotron>

      <Container>
        <Row>
          <Col>
            <CommentForm itemId={item._id} />
          </Col>
          <Col>
            <CommentList item={item} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
      Loading...
    </Spinner>
  );
};

export default StudyPage;
