import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Jumbotron, ListGroup, Spinner } from "reactstrap";

const LogEntryPage = props => {
  const [log, setLog] = useState({});

  useEffect(() => {
    axios
      .get(`/api/logs/${props.match.params.id}`)
      .then(res => {
        setLog(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.match.params.id]);

  if (log === null || log === undefined) {
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
            <h1 className="display-1">{log.name}</h1>

            <p className="lead">
              This topic was added on{" "}
              <Moment format="DD/MM/YYYY">{log.date}</Moment>
            </p>
            <hr className="my-2" />

            <ListGroup className="flex-row m-auto">
              <Link
                to={`/api/logs/${log.name}`}
                className="btn btn-dark mt-4"
                color="dark"
              >
                More of {log.name}
              </Link>
              {/* 
              <Link
                to={`/api/users/${user.name}`}
                className="btn btn-dark mt-4 ml-4"
                color="dark"
              >
                Go To Profile
              </Link> */}
            </ListGroup>
          </Container>
        </Jumbotron>
        <Container className="mx-md-auto">
          {log.entry !== undefined ? (
            log.entry.split("\n").map((text, i) => {
              return (
                <p key={i} data={text}>
                  {text}
                </p>
              );
            })
          ) : (
            <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
              Please wait... Loading Log Entry...
            </Spinner>
          )}
        </Container>
      </Fragment>
    );
  }
};

export default LogEntryPage;
