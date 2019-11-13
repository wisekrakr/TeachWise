import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem, Container, Spinner } from "reactstrap";
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

  return logs !== null && !loading && Object.keys(logs).length ? (
    <Container>
      <ListGroup>
        {/* Shows a list of study items */}
        <TransitionGroup className="log-list">
          {logs.map(log =>
            console.log(log)
            // <CSSTransition key={log._id} timeout={500} classNames="fade">
            //   <ListGroupItem key={log._id}>
            //     <LogEntry log={log} />
            //   </ListGroupItem>
            // </CSSTransition>
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  ) : (
    <Container className="mt-4">
      <p>Please add a log entry....</p>
    </Container>
  );
};

export default LogEntryList;
