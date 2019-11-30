import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Spinner, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import LogEntry from "./LogEntry";
import { getLogs } from "../../actions/LogState";

const LogEntryList = ({ getLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  if (logs === null && logs === undefined && Object.keys(logs).length === 0) {
    return (
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    );
  }

  return logs.length !== 0 ? (
    <Container>
      <h3 className="text-center small-heading">Your Log Entries</h3>
      <p className="heading-underline" />
      {logs !== null && !loading ? (
        <ListGroup>
          {/* Shows a list of study items */}
          <TransitionGroup className="log-list">
            {logs.map(log => (
              <CSSTransition key={log._id} timeout={500} classNames="fade">
                <LogEntry key={log._id} log={log} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
          Please add a log entry....
        </Spinner>
      )}
    </Container>
  ) : (
    <Fragment>
      <h3 className="x-small-heading">
        Try to enter something into your log every time you study, to keep track
        of your progress
      </h3>
    </Fragment>
  );
};

LogEntryList.prototypes = {
  getLogs: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs })(LogEntryList);
