import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Badge, Jumbotron, ListGroup, Spinner } from "reactstrap";

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

  if (item === null || item === undefined) {
    return (
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    );
  } else {
    return (
      <Fragment>
        <Jumbotron fluid>
          <Container fluid>
            <Badge
              className="status-badge"
              color={statusColor()}
              style={{ float: "right" }}
            >
              {item.status}
            </Badge>
            <h1 className="display-1">{item.name}</h1>

            <p className="lead">
              This topic was added on{" "}
              <Moment format="DD/MM/YYYY">{item.date}</Moment>
            </p>
            <hr className="my-2" />
            <p>
              Field of Study: <strong>{item.field_of_study}</strong>{" "}
            </p>
            <p>
              Study Material: <strong>{item.material}</strong>{" "}
            </p>
            <p>
              Learning Curve: <strong>{item.difficulty}</strong>{" "}
            </p>

            <ListGroup className="flex-row m-auto">
              <Link
                to={`/api/items/${item.name}`}
                className="btn btn-dark mt-4"
                color="dark"
              >
                More of {item.name}
              </Link>

              <Link
                to={`/api/items/${item.field_of_study}`}
                className="btn btn-dark mt-4 ml-4"
                color="dark"
              >
                More of {item.field_of_study}
              </Link>
            </ListGroup>
          </Container>
        </Jumbotron>
      </Fragment>
    );
  }
};

export default StudyPage;
