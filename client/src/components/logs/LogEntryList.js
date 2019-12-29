import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import LogEntry from "./LogEntry";
import { getLogs } from "../../actions/LogState";
import LogEntryModal from "./LogEntryModal";
import Spinner from "../../background/Spinner";

const LogEntryList = ({ getLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  if (logs === null && logs === undefined && Object.keys(logs).length === 0) {
    return <Spinner />;
  }

  return logs.length !== 0 ? (
    <Container>
      <h6 className="text-center small-heading">Log Entries</h6>
      <Button className="btn draw-border m-auto">
        {" "}
        <LogEntryModal />
      </Button>

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
        <Spinner />
      )}
    </Container>
  ) : (
    <Fragment>
      <h6 className="x-small-heading">
        Try to enter something into your log every time you study, to keep track
        of your progress
      </h6>
      <Button className="btn draw-border m-auto">
        {" "}
        <LogEntryModal />
      </Button>
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
