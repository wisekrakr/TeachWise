import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import logContext from "../../contexts/logs/logContext";
import LogEntry from "./LogEntry";

const LogEntryList = () => {
  const context = useContext(logContext);
  const { logs, getLogs, loading } = context;

  useEffect(() => {
    getLogs();
  }, []);

  if (logs === null && logs === undefined && Object.keys(logs).length === 0) {
    return (
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    );
  }

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default LogEntryList;
