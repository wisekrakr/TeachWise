import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Container, Jumbotron, ListGroup } from "reactstrap";

import { getLogEntry } from "../actions/LogState";
import Spinner from "../background/Spinner";

const LogEntryPage = ({ getLogEntry, log: { log, loading }, match }) => {
  useEffect(() => {
    getLogEntry(match.params.id);
  }, [getLogEntry, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return log !== null && log !== undefined ? (
    <Fragment>
      <Jumbotron fluid className="jumbo-item">
        <Container fluid>
          <h1 className="large-heading display-1">{log.name}</h1>

          <p className="lead">
            This entry was added on{" "}
            <Moment format="YYYY-MM-DD HH:mm">{log.date}</Moment>
            <br />
            {log.topic !== null &&
            log.topic !== undefined &&
            log.topic !== "" ? (
              <em>Topic: {log.topic}</em>
            ) : (
              ""
            )}
          </p>

          <hr className="my-2" />

          {log.topic !== "No Specific Topic" ? (
            <ListGroup className="flex-row m-auto">
              <Link
                to={`/api/logs/${log._id}`}
                className="btn btn-dark mt-4"
                color="dark"
              >
                More of {log.topic}
              </Link>
            </ListGroup>
          ) : null}
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
          <Spinner />
        )}
      </Container>
    </Fragment>
  ) : (
    <Spinner />
  );
};

LogEntryPage.propTypes = {
  getLogEntry: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogEntry })(LogEntryPage);
