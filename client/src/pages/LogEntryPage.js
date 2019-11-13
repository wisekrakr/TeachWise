import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Badge, Jumbotron, ListGroup, Spinner } from "reactstrap";

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
          <Container fluid>BLALBLALBLA</Container>
        </Jumbotron>
      </Fragment>
    );
  }
};

export default LogEntryPage;
